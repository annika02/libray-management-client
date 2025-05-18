import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import Swal from "sweetalert2";

// Skeleton loader component
const SkeletonCard = () => (
  <div className="border rounded-lg p-4 shadow-lg animate-pulse">
    <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-8 bg-gray-300 rounded w-1/3 mt-4"></div>
  </div>
);

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningBookId, setReturningBookId] = useState(null);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch(
        "https://library-server-alpha.vercel.app/borrow",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Borrowed books response:", data); // Debug log
      const filteredBooks = data.filter((book) => book.email === user.email);

      const aggregatedBooks = filteredBooks.reduce((acc, book) => {
        const existing = acc.find((b) => b.bookId === book.bookId);
        if (existing) {
          existing.quantity += book.quantity;
          existing.borrowIds.push(book._id);
        } else {
          acc.push({
            ...book,
            bookId: book.bookId,
            quantity: book.quantity,
            borrowIds: [book._id],
          });
        }
        return acc;
      }, []);

      setUserBorrowedBooks(aggregatedBooks);
    } catch (err) {
      console.error("Error fetching borrowed books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
    const intervalId = setInterval(fetchBorrowedBooks, 15000);
    return () => clearInterval(intervalId);
  }, [user.email]);

  const handleReturnBook = async (bookId, borrowIds, category, quantity) => {
    setReturningBookId(bookId);
    try {
      // Normalize category with fallback to 'fiction'
      const normalizedCategory = category
        ? category
            .toLowerCase()
            .replace(/[\s-]+/g, "")
            .replace(/[^a-z0-9]/g, "")
        : "fiction";

      // Construct URL
      const baseUrl = "https://library-server-alpha.vercel.app";
      const returnUrl =
        `${baseUrl}/${normalizedCategory}/${bookId}/return`.replace(
          /\/+/g,
          "/"
        );

      // Log for debugging
      console.log(
        "Original Category:",
        category,
        "Normalized Category:",
        normalizedCategory
      );
      console.log("Return URL:", returnUrl);

      // Use fetch to avoid axios headers
      const patchResponse = await fetch(returnUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantityToReturn: quantity }),
      });

      if (patchResponse.ok) {
        await Promise.all(
          borrowIds.map((id) =>
            fetch(`https://library-server-alpha.vercel.app/borrow/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
          )
        );
        Swal.fire({
          icon: "success",
          title: "Returned Successfully",
          text: `${quantity} copies have been returned.`,
        });
        fetchBorrowedBooks();
      } else {
        throw new Error(`Return failed: ${patchResponse.statusText}`);
      }
    } catch (error) {
      console.error("Error returning the book:", error.message);
      Swal.fire({
        icon: "error",
        title: "Return Failed",
        text: error.message || "Failed to return the book. Please try again.",
      });
    } finally {
      setReturningBookId(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Borrowed Books</h2>
      <p className="text-lg mb-4">
        Total Borrowed Books:{" "}
        {userBorrowedBooks.reduce((sum, book) => sum + book.quantity, 0)}
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill()
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : userBorrowedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBorrowedBooks.map((book) => (
            <div key={book.bookId} className="border rounded-lg p-4 shadow-lg">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-600">
                Category: {book.category || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                Description: {book.details || "No description available"}
              </p>
              <p className="text-sm text-gray-600">
                Borrowed Quantity: {book.quantity}
              </p>
              <p className="text-sm text-gray-600">
                Borrowed:{" "}
                {new Date(book.borrowedDate).toLocaleDateString("en-US")}
              </p>
              <p className="text-sm text-gray-600">
                Return By:{" "}
                {new Date(book.returnDate).toLocaleDateString("en-US")}
              </p>
              <button
                onClick={() =>
                  handleReturnBook(
                    book.bookId,
                    book.borrowIds,
                    book.category,
                    book.quantity
                  )
                }
                disabled={returningBookId === book.bookId}
                className={`mt-4 px-4 py-2 rounded text-white w-full ${
                  returningBookId === book.bookId
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {returningBookId === book.bookId ? "Returning..." : "Return"}
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
