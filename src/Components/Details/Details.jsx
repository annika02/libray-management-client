import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const data = useLoaderData(); // Load book data
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
  } = data;
  const email = user.email;
  const borrowedInfo = {
    email,
    name,
    author,
    category,
    details,
    image,
    quantity: Number(initialQuantity) || 0,
    rating,
    _id,
    borrowedDate: new Date().toISOString().split("T")[0], // Current date
    returnDate: "",
  };
  console.log("Loaded book data:", data);
  const [quantity, setQuantity] = useState(Number(initialQuantity) || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  const handleBorrow = async () => {
    const updatedBorrowedInfo = { ...borrowedInfo, returnDate };
    try {
      const postResponse = await axios.post(
        "https://library-server-alpha.vercel.app/borrow",
        updatedBorrowedInfo
      );
      console.log("Borrow request sent:", postResponse.data);
    } catch (postError) {
      console.error(
        "Error posting borrow request:",
        postError.response?.data || postError.message
      );
      Swal.fire({
        icon: "error",
        title: "Borrow Failed",
        text:
          postError.response?.data?.error || "Failed to save borrow request.",
      });
      return;
    }

    if (quantity > 0) {
      try {
        const patchResponse = await axios.patch(
          `https://library-server-alpha.vercel.app/${normalizeCategory(
            category
          )}/${_id}/borrow`
        );
        console.log("Patch response:", patchResponse.data);

        if (patchResponse.status === 200) {
          setQuantity((prev) => prev - 1);
          Swal.fire({
            icon: "success",
            title: "Borrowed Successfully",
            text: `${name} has been borrowed.`,
          });
          setIsModalOpen(false);
        }
      } catch (patchError) {
        console.error(
          "Error borrowing the book:",
          patchError.response?.data || patchError.message
        );
        Swal.fire({
          icon: "error",
          title: "Borrow Failed",
          text:
            patchError.response?.data?.error ||
            "Failed to update book quantity.",
        });
        const updatedData = await axios.get(
          `https://library-server-alpha.vercel.app/${normalizeCategory(
            category
          )}/${_id}`
        );
        setQuantity(Number(updatedData.data.quantity) || 0);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Out of Stock",
        text: "No copies available to borrow.",
      });
    }
  };

  const handleUpdate = () => {
    localStorage.setItem("id", _id);
    navigate("/update");
  };

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
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full md:w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
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
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {details}
            </p>
          </div>
          <div className="mt-6 space-x-2">
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => setIsModalOpen(true)}
              disabled={quantity === 0}
            >
              Borrow
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mb-[60px]">
            <h2 className="text-2xl font-bold mb-4">Borrow {name}</h2>
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
                  value={user.displayName || "Unknown"}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
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
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
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
