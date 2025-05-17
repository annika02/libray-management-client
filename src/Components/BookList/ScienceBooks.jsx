import { useContext } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import ReactStars from "react-rating-stars-component";
import { useLoaderData, useNavigate } from "react-router-dom";
const ScienceBooks = () => {
  const scienceBooks = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handelDetails = (category, id) => {
    if (user) {
      navigate(`/details/${category.toLowerCase()}/${id}`);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Science Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {scienceBooks.map((res) => (
          <div
            key={res._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={res.image}
              alt="Book"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <strong className="text-lg block font-semibold mb-2">
              {res.name}
            </strong>
            <span className="block text-sm text-gray-600">
              Author Name: {res.author}
            </span>
            <span className="block text-sm text-gray-600">
              Category: {res.category}
            </span>

            {/* Rating component */}
            <div className="flex items-center mt-2">
              <ReactStars
                count={5}
                value={res.rating}
                edit={false} // Set this to false to make it read-only
                size={24}
                activeColor="#ffd700" // Gold color for active stars
              />
              <strong className="ml-2">{`(${res.rating})`}</strong>
            </div>

            <span className="block text-sm text-gray-600">
              Quantity: {res.quantity}
            </span>
            <button
              onClick={() => handelDetails(res.category, res._id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScienceBooks;
