import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root/Root";
import Registration from "./Components/Regsitration/Regsitration";
import AuthProvider from "./ContexProvider/AuthProvider";
import Loging from "./Components/Loging/Loging";
import Home from "./Root/Layout/Home";
import FictionBook from "./Components/BookList/FictionBook";
import ScienceBooks from "./Components/BookList/ScienceBooks";
import HistoryBooks from "./Components/BookList/HistoryBooks";
import NonFictionBooks from "./Components/BookList/NonFictionBooks";
import Details from "./Components/Details/Details";
import Private from "./Private/Private";
import BorrowedBooks from "./Root/Layout/BorrowedBooks";
import AllBooks from "./Root/Layout/AllBooks";
import UpdateBooks from "./Root/Layout/UpdateBooks";
import AddBook from "./Root/Layout/AddBooks";
import NotFound from "./Root/Layout/NotFound";

// Category mapping to match backend routes
const categoryMap = {
  fiction: "fiction",
  science: "science",
  history: "history",
  nonfiction: "nonfiction",
  "non-fiction": "nonfiction",
  Fiction: "fiction",
  Science: "science",
  History: "history",
  NonFiction: "nonfiction",
  Nonfiction: "nonfiction",
};

const normalizeCategory = (category) => {
  if (!category) return "fiction"; // Fallback
  const normalized = category.toLowerCase().replace(/\s|-/g, "");
  return categoryMap[normalized] || normalized;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "reg",
        element: <Registration></Registration>,
      },
      {
        path: "login",
        element: <Loging></Loging>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/fiction",
        element: <FictionBook></FictionBook>,
        loader: () => fetch("https://library-server-alpha.vercel.app/fiction"),
      },
      {
        path: "/science",
        element: <ScienceBooks></ScienceBooks>,
        loader: () => fetch("https://library-server-alpha.vercel.app/science"),
      },
      {
        path: "/history",
        element: <HistoryBooks></HistoryBooks>,
        loader: () => fetch("https://library-server-alpha.vercel.app/history"),
      },
      {
        path: "/nonfiction",
        element: <NonFictionBooks></NonFictionBooks>,
        loader: () =>
          fetch(`https://library-server-alpha.vercel.app/nonfiction`),
      },
      {
        path: "/details/:category/:id",
        element: (
          <Private>
            <Details />
          </Private>
        ),
        loader: async ({ params }) => {
          const { id, category: rawCategory } = params;
          const category = normalizeCategory(rawCategory);
          console.log(`Fetching details for /${category}/${id}`);
          const response = await fetch(
            `https://library-server-alpha.vercel.app/${category}/${id}`
          );
          if (!response.ok) {
            console.error(
              `Error fetching /${category}/${id}: ${response.status}`
            );
            throw new Response(`Book not found: ${category}/${id}`, {
              status: response.status,
            });
          }
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Response("Invalid response format", { status: 500 });
          }
          return response.json();
        },
      },
      {
        path: "/borrowed",
        element: (
          <Private>
            <BorrowedBooks></BorrowedBooks>
          </Private>
        ),
        loader: () => fetch("https://library-server-alpha.vercel.app/borrow"),
      },
      {
        path: "/allbooks",
        element: (
          <Private>
            <AllBooks></AllBooks>
          </Private>
        ),
      },
      {
        path: "/update",
        element: (
          <Private>
            <UpdateBooks></UpdateBooks>
          </Private>
        ),
      },
      {
        path: "/addbooks",
        element: (
          <Private>
            <AddBook></AddBook>
          </Private>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
