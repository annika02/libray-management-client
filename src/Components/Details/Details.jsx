import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import Swal from "sweetalert2";

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

const normalizeCategory = (cat) => {
  if (!cat) return "fiction";
  const normalized = cat.toLowerCase().replace(/[\s-]+/g, "");
  return categoryMap[normalized] || "fiction";
};

const Details = () => {
  const { category, id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const { user } = useContext(AuthContext);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const endpointCategory = normalizeCategory(category);
      const response = await fetch(
        `https://library-server-alpha.vercel.app/${endpointCategory}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();
      if (data?.error) {
        setError(data.error);
        setBook(null);
      } else {
        setBook(data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching book:", err);
      setError(`Failed to fetch book details: ${err.message}`);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    if (!returnDate) {
      setMessage("Please select a return date.");
      return;
    }

    try {
      const normalizedCategory = normalizeCategory(book.category);
      const borrowResponse = await fetch(
        `https://library-server-alpha.vercel.app/borrow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId: id,
            name: user.displayName,
            email: user.email,
            category: normalizedCategory,
            quantity: 1,
            image: book.image,
            details: book.details || "No description available",
            returnDate,
            borrowedDate: new Date().toISOString(),
          }),
        }
      );

      if (!borrowResponse.ok) {
        throw new Error("Borrow request failed");
      }

      const patchResponse = await fetch(
        `https://library-server-alpha.vercel.app/${normalizedCategory}/${id}/borrow`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantityToBorrow: 1 }),
        }
      );

      if (!patchResponse.ok) {
        throw new Error("Borrow quantity update failed");
      }

      setMessage("Book borrowed successfully.");
      setShowModal(false);
      fetchBook();
    } catch (err) {
      console.error("Borrow error:", err);
      setMessage(`Borrow failed: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [category, id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-2">{book.name}</h2>
      <img
        src={book.image}
        alt={book.name}
        className="w-full max-h-80 object-cover rounded mb-4"
      />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Category:</strong> {book.category}
      </p>
      <p>
        <strong>Rating:</strong> {book.rating}
      </p>
      <p>
        <strong>Quantity:</strong> {book.quantity}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Description:</strong>{" "}
        {book.details || "No description available"}
      </p>

      <button
        onClick={() => setShowModal(true)}
        disabled={book.quantity <= 0}
        className={`mt-6 px-4 py-2 rounded text-white ${
          book.quantity <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {book.quantity <= 0 ? "Out of Stock" : "Borrow"}
      </button>

      {message && <p className="mt-4 text-blue-600">{message}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Borrow Book</h3>
            <p>
              <strong>Name:</strong> {user.displayName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <label className="block mt-4">
              <span className="text-sm font-medium">Return Date:</span>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-1 block w-full border px-2 py-1 rounded"
              />
            </label>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBorrow}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
