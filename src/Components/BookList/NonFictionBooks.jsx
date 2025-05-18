import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../ContexProvider/AuthProvider";

// Category mapping for normalization
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
  Novel: "fiction",
  Thriller: "nonfiction",
  Drama: "science",
};

const normalizeCategory = (category) => {
  if (!category) return "nonfiction";
  const normalized = category.toLowerCase().replace(/\s|-/g, "");
  return categoryMap[normalized] || "nonfiction";
};

const NonFictionBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch books from server
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://library-server-alpha.vercel.app/allbooks?t=${Date.now()}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();

      const nonFictionBooks = data.filter(
        (book) =>
          book._id &&
          book.name &&
          book.author &&
          book.category &&
          normalizeCategory(book.category) === "nonfiction"
      );

      if (nonFictionBooks.length === 0) {
        setError("No non-fiction books found.");
        setBooks([]);
      } else {
        setBooks(nonFictionBooks);
        setError(null);
      }
    } catch (err) {
      setError(`Failed to load non-fiction books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBooks([]);
    fetchBooks();
  }, []);

  // Validate single book ID
  const validateBookId = async (id) => {
    try {
      const response = await fetch(
        `https://library-server-alpha.vercel.app/nonfiction/${id}?t=${Date.now()}`
      );
      if (!response.ok) return false;
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json"))
        return false;

      const data = await response.json();
      return !!data && !data.error;
    } catch (err) {
      console.error(`Error validating ID ${id}:`, err);
      return false;
    }
  };

  const handleDetails = async (category, id) => {
    const backendCategory = normalizeCategory(category);
    const bookExists = books.some((book) => book._id === id);
    if (!bookExists) {
      alert("Book unavailable.");
      return;
    }

    const isValid = await validateBookId(id);
    if (!isValid) {
      alert("Book unavailable.");
      setBooks((prev) => prev.filter((book) => book._id !== id));
      fetchBooks();
      return;
    }

    if (user) {
      navigate(`/details/${backendCategory}/${id}`);
    } else {
      navigate("/login");
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mt-4"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Non-Fiction Books</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <p>No non-fiction books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
              <p className="text-sm text-gray-600">
                Category: {book.category || "Non-Fiction"}
              </p>
              <p className="text-sm text-gray-600">
                Description: {book.details || "No description available"}
              </p>
              <p className="text-sm text-gray-600">
                Available Quantity: {book.quantity || 0}
              </p>
              <div className="flex items-center mt-2">
                <ReactStars
                  count={5}
                  value={book.rating}
                  edit={false}
                  size={24}
                />
                <span className="ml-2 text-sm">Rating: {book.rating} ★</span>
              </div>
              <button
                onClick={() => handleDetails(book.category, book._id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NonFictionBooks;
