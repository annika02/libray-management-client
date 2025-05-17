import { useNavigate } from "react-router-dom";
import fictionImg from "../../assets/friction.jpg";
import nonFictionImg from "../../assets/nonFection.jpg";
import scienceImg from "../../assets/science.jpg";
import historyImg from "../../assets/history.jpg";
const BookCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Fiction", image: fictionImg },
    { id: 2, name: "Non-Fiction", image: nonFictionImg },
    { id: 3, name: "Science", image: scienceImg },
    { id: 4, name: "History", image: historyImg },
  ];
  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="border rounded-lg shadow-lg cursor-pointer"
          onClick={() => handleCategoryClick(category.name)}
        >
          <img
            src={`${category.image}`}
            alt={category.name}
            className="w-full h-40 object-cover rounded-t-lg"
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
