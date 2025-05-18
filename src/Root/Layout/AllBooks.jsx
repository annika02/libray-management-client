import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { AuthContext } from "../../ContexProvider/AuthProvider";

// Category mapping to match backend routes (aligned with backend)
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

// Normalize category to match backend logic
const normalizeCategory = (category) => {
  if (!category) return "fiction";
  const normalized = category.toLowerCase().replace(/\s|-/g, "");
  return categoryMap[normalized] || "fiction";
};

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://library-server-alpha.vercel.app/allbooks"
      );
      console.log("Fetched from /allbooks:", response.data);

      if (response.data && response.data.length > 0) {
        const uniqueBooks = Array.from(
          new Map(response.data.map((book) => [book._id, book])).values()
        );
        setBooks(uniqueBooks);
      } else {
        setError("No books found in the library.");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();

    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchBooks, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleDetails = (category, id) => {
    const backendCategory = normalizeCategory(category);
    console.log(`Attempting to navigate to /details/${backendCategory}/${id}`);

    const bookExists = books.some((book) => book._id === id);

    if (!bookExists) {
      console.error(
        `Book with ID ${id} not found in local ${backendCategory} data`
      );
      alert("This book is currently unavailable. Please try another book.");
      return;
    }

    if (user) {
      navigate(`/details/${backendCategory}/${id}`);
    } else {
      navigate("/login");
    }
  };

  const handleUpdate = (id) => {
    localStorage.setItem("id", id);
    navigate("/update");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">All Books</h2>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">All Books</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">All Books</h2>
      {books.length === 0 ? (
        <p>No books available at the moment.</p>
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
              <p className="text-sm text-gray-600">Category: {book.category}</p>
              <p className="text-sm text-gray-600">
                Quantity Available: {book.quantity || 0}
              </p>
              <div className="flex items-center mt-2">
                <ReactStars
                  count={5}
                  value={book.rating}
                  edit={false}
                  size={24}
                />
                <span className="ml-2 text-sm">({book.rating})</span>
              </div>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleDetails(book.category, book._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Details
                </button>
                <button
                  onClick={() => handleUpdate(book._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
