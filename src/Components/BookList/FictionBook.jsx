import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { AuthContext } from "../../ContexProvider/AuthProvider";

const FictionBook = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://library-server-alpha.vercel.app/allbooks")
      .then((res) => {
        const fictionBooks = res.data.filter(
          (book) => book.category.toLowerCase() === "fiction"
        );
        setBooks(fictionBooks);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleDetails = (category, id) => {
    if (user) {
      navigate(`/details/${category.toLowerCase()}/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Fiction Books</h2>
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
            <div className="flex items-center mt-2">
              <ReactStars
                count={5}
                value={book.rating}
                edit={false}
                size={24}
              />
              <span className="ml-2 text-sm">({book.rating})</span>
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
    </div>
  );
};

export default FictionBook;
