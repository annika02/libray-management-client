import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    image: "", // This will store the image URL
    name: "",
    quantity: 0,
    author: "",
    category: "",
    description: "",
    rating: 1,
    email: "", // Add email to the state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const value = e.target.value;
    setBookData((prevData) => ({
      ...prevData,
      image: value, // Set the URL instead of a file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: bookData.email,
      image: bookData.image, // Use the URL here
      name: bookData.name,
      quantity: bookData.quantity,
      author: bookData.author,
      category: bookData.category,
      description: bookData.description,
      rating: bookData.rating,
    };

    try {
      // Send the form data to the server
      await axios.post(
        "https://library-server-alpha.vercel.app/allbooks",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Set as JSON
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Added Book Successfully",
        text: "Book has been added.",
      });
    } catch (error) {
      toast.error(
        `Failed to add book: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Add Books</title>
      </Helmet>
      <h2 className="text-2xl font-bold">Add New Book</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={bookData.email}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Book Cover (Image URL)</label>
          <input
            type="text"
            name="image"
            value={bookData.image}
            onChange={handleImageUpload}
            placeholder="Enter image URL"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Book Title</label>
          <input
            type="text"
            name="name"
            value={bookData.name}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={bookData.quantity}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Author Name</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="category"
            value={bookData.category}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          >
            <option value="Novel">Fiction</option>
            <option value="Thriller">Non-Fiction</option>
            <option value="History">History</option>
            <option value="Drama">Science</option>
          </select>
        </div>
        <div>
          <label>Short Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={bookData.rating}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Book
        </button>
      </form>

      <div className="mt-6">
        <h3 className="font-semibold">Book Content</h3>
        <p>This is a static text providing more information about the book.</p>
      </div>
    </div>
  );
};

export default AddBook;
