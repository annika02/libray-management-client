import { useNavigate } from "react-router-dom";
import fictionImg from "../../assets/friction.jpg";
import nonFictionImg from "../../assets/nonFection.jpg";
import scienceImg from "../../assets/science.jpg";
import historyImg from "../../assets/history.jpg";

const BookCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Fiction", path: "fiction", image: fictionImg },
    { id: 2, name: "Non-Fiction", path: "nonfiction", image: nonFictionImg },
    { id: 3, name: "Science", path: "science", image: scienceImg },
    { id: 4, name: "History", path: "history", image: historyImg },
  ];

  const handleCategoryClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.path)}
          className="border rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-40 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-center">{category.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCategories;
