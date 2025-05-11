import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-2">The page you are looking for does not exist.</p>
        <button
          className="pl-3 pr-3 bg-green-200 rounded-md hover:bg-purple-200"
          onClick={backHome}
        >
          Back Home 🏠
        </button>
      </div>
    </div>
  );
};

export default NotFound;
