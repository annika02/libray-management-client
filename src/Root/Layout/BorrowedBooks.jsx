import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BorrowedBooks = () => {
  const borrowedData = useLoaderData(); // All borrowed books data
  const { user } = useContext(AuthContext);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState(
    borrowedData.filter((book) => book.email === user.email)
  );

  const handleReturnBook = async (bookId, category) => {
    console.log("Returning book:", { bookId, category });
    try {
      const normalizedCategory = category.toLowerCase();
      const patchResponse = await axios.patch(
        `https://library-server-alpha.vercel.app/${normalizedCategory}/${bookId}/return`
      );
      if (patchResponse.status === 200) {
        await axios.delete(
          `https://library-server-alpha.vercel.app/borrow/${bookId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Returned Successfully",
          text: "The book has been returned.",
        });
        setUserBorrowedBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
      }
    } catch (error) {
      console.error(
        "Error returning the book:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Return Failed",
        text: error.response?.data?.error || "Failed to return the book.",
      });
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>My Borrowed Books</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Borrowed Books</h2>
      {userBorrowedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBorrowedBooks.map((book) => (
            <div key={book._id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">Category: {book.category}</p>
              <p className="text-sm text-gray-600">
                Borrowed: {book.borrowedDate}
              </p>
              <p className="text-sm text-gray-600">
                Return By: {book.returnDate}
              </p>
              <button
                onClick={() => handleReturnBook(book._id, book.category)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No books borrowed by you.</p>
      )}
    </div>
  );
};

export default BorrowedBooks;
