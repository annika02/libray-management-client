import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
  const data = useLoaderData(); // Load book data
  const { user } = useContext(AuthContext);

  // Check if data is valid
  if (!data || !data._id) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Book Not Found</h1>
        <p className="text-gray-600">
          The requested book could not be found. Please try another book.
        </p>
      </div>
    );
  }

  const {
    name,
    author,
    category,
    details,
    image,
    quantity: initialQuantity,
    rating,
    _id,
  } = data; // Destructure data
  const email = user.email;
  const borrowedInfo = {
    email,
    name,
    author,
    category,
    details,
    image,
    quantity: initialQuantity,
    rating,
    _id,
  };
  console.log("Book ID:", _id); // Debug log
  const [quantity, setQuantity] = useState(initialQuantity); // Manage book quantity
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [returnDate, setReturnDate] = useState(""); // Manage return date input

  const handleBorrow = async () => {
    try {
      const response = await axios.post(
        "https://library-server-alpha.vercel.app/borrow",
        borrowedInfo
      );
      console.log("Borrow request sent:", response.data); // Debug log
    } catch (error) {
      console.error("Error posting borrow request:", error.message);
    }

    if (quantity > 0) {
      try {
        // Send the request to the server to decrement the quantity
        const response = await axios.patch(
          `https://library-server-alpha.vercel.app/${normalizeCategory(
            category
          )}/${_id}/borrow`
        );

        if (response.status === 200) {
          setQuantity(quantity - 1); // Update the quantity in the UI
          Swal.fire({
            icon: "success",
            title: "Borrowed Book Successfully",
            text: "Book",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          setIsModalOpen(false); // Close modal
        }
      } catch (error) {
        console.error("Error borrowing the book:", error);
        Swal.fire({
          icon: "error",
          title: "Borrow Failed",
          text: "There was an error borrowing the book. Please try again.",
        });
      }
    }
  };

  // Reuse normalizeCategory for borrow URL
  const normalizeCategory = (category) => {
    const categoryMap = {
      fiction: "fiction",
      science: "science",
      history: "history",
      nonfiction: "non-fiction",
      "non-fiction": "non-fiction",
      Fiction: "fiction",
      Science: "science",
      History: "history",
      NonFiction: "non-fiction",
      Nonfiction: "non-fiction",
    };
    if (!category) return "fiction";
    const normalized = category.toLowerCase().replace(/\s|-/g, "");
    return categoryMap[normalized] || normalized;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full md:w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* Book Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Author:</strong> {author}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Category:</strong> {category}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Rating:</strong> {rating} ⭐
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Quantity Available:</strong> {quantity}
            </p>
          </div>
          {/* Description */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Book Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {details}
            </p>
          </div>
          {/* Borrow Button */}
          <button
            className={`mt-6 px-4 py-2 rounded-lg text-white ${
              quantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => setIsModalOpen(true)}
            disabled={quantity === 0}
          >
            Borrow
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mb-[60px]">
            <h2 className="text-2xl font-bold mb-4">Borrow Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBorrow();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
