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
import Private from "./Private/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
