import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/allbooks")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  const handelUpdata = (id) => {
    console.log(id);
    localStorage.setItem("id", JSON.stringify(id));
    navigate("/update");
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>All Books</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              className="w-full h-64 object-cover mb-4"
              src={book.image}
              alt={book.name}
            />
            <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Category: {book.category}</p>
            <p className="text-sm text-gray-600">Rating: {book.rating}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handelUpdata(book._id)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
