import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBooks = () => {
  const navigate = useNavigate();
  let storeId = localStorage.getItem("id");

  if (storeId) {
    storeId = storeId.replace(/^"(.*)"$/, "$1"); // Remove any surrounding quotes
  }

  const [book, setBook] = useState({
    image: "",
    name: "",
    author: "",
    category: "",
    rating: "",
    quantity: "", // Added quantity field
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://library-server-alpha.vercel.app/allbooks/${storeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data && !data.error) {
          setBook({
            image: data.image || "",
            name: data.name || "",
            author: data.author || "",
            category: data.category || "",
            rating: data.rating?.toString() || "",
            quantity: data.quantity?.toString() || "0", // Initialize quantity
          });
        } else {
          console.error("Book not found:", data.error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Book not found.",
          });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch book details.",
        });
      }
    };

    if (storeId) {
      fetchBook();
    }
  }, [storeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookToUpdate = {
      ...book,
      rating: parseFloat(book.rating),
      quantity: parseInt(book.quantity, 10), // Ensure quantity is an integer
    };

    // Validation
    if (
      !bookToUpdate.image.trim() ||
      !bookToUpdate.name.trim() ||
      !bookToUpdate.author.trim() ||
      !bookToUpdate.category.trim() ||
      isNaN(bookToUpdate.rating) ||
      bookToUpdate.rating < 1 ||
      bookToUpdate.rating > 5 ||
      isNaN(bookToUpdate.quantity) ||
      bookToUpdate.quantity < 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please fill in all fields correctly. Rating must be 1-5, and quantity must be non-negative.",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://library-server-alpha.vercel.app/allbooks/${storeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      Swal.fire({
        icon: "success",
        title: "Updated Book Successfully",
        text: "Book information has been updated.",
      });
      navigate("/allbooks");
    } catch (error) {
      console.error("Update failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update book. Please try again.",
      });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={book.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={book.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select a category --</option>
            <option value="fiction">Fiction</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="nonfiction">Non-Fiction</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
            min="0"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBooks;
