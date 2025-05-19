import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { AuthContext } from "../../ContexProvider/AuthProvider";

// Reuse category map and normalize function if you want, or import if defined elsewhere
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
  if (!category) return "fiction";
  const normalized = category.toLowerCase().replace(/\s|-/g, "");
  return categoryMap[normalized] || "fiction";
};

const NonFictionBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://library-server-alpha.vercel.app/nonfiction?t=${Date.now()}`
      );
      if (response.data && response.data.length > 0) {
        setBooks(response.data);
        setError(null);
      } else {
        setError("No nonfiction books found.");
      }
    } catch (err) {
      console.error("Error fetching nonfiction books:", err);
      setError("Failed to load nonfiction books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    const intervalId = setInterval(fetchBooks, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDetails = (category, id) => {
    const backendCategory = normalizeCategory(category);
    const bookExists = books.some((book) => book._id === id);
    if (!bookExists) {
      console.error(`Book with ID ${id} not found`);
      alert("Book unavailable.");
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

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Nonfiction Books</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Nonfiction Books</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill()
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : books.length === 0 ? (
        <p>No nonfiction books available.</p>
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
