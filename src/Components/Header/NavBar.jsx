import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import {
  FaBook,
  FaPlusCircle,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [userPhoto, setUserPhoto] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (user?.photoURL) {
      setUserPhoto(user.photoURL);
    }
  }, [user]);

  const handleLogout = () => {
    signout();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl font-bold text-yellow-400 flex items-center">
              <FaBook className="mr-2" /> LibroSphere
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-yellow-300 transition-colors flex items-center ${
                  isActive ? "text-yellow-400 font-bold" : ""
                }`
              }
            >
              <FaHome className="mr-1" /> Home
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/allbooks"
                  className={({ isActive }) =>
                    `text-white hover:text-yellow-300 transition-colors flex items-center ${
                      isActive ? "text-yellow-400 font-bold" : ""
                    }`
                  }
                >
                  <FaBook className="mr-1" /> All Books
                </NavLink>
                <NavLink
                  to="/addbooks"
                  className={({ isActive }) =>
                    `text-white hover:text-yellow-300 transition-colors flex items-center ${
                      isActive ? "text-yellow-400 font-bold" : ""
                    }`
                  }
                >
                  <FaPlusCircle className="mr-1" /> Add Books
                </NavLink>
                <NavLink
                  to="/borrowed"
                  className={({ isActive }) =>
                    `text-white hover:text-yellow-300 transition-colors flex items-center ${
                      isActive ? "text-yellow-400 font-bold" : ""
                    }`
                  }
                >
                  <FaBook className="mr-1" /> Borrowed
                </NavLink>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/reg"
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-2 px-4 rounded-full flex items-center transition-all"
                >
                  <FaUserPlus className="mr-2" /> Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-2 px-4 rounded-full flex items-center transition-all"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </NavLink>
              </>
            ) : (
              <div className="relative group">
                <div className="flex items-center cursor-pointer">
                  <img
                    src={userPhoto || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
                  />
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-semibold">{user.displayName}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDropdown}
              className="text-white focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {dropdownVisible && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg py-2">
            <NavLink
              to="/"
              className="block px-4 py-3 text-gray-800 hover:bg-blue-50 font-medium flex items-center"
              onClick={toggleDropdown}
            >
              <FaHome className="mr-2" /> Home
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/allbooks"
                  className="block px-4 py-3 text-gray-800 hover:bg-blue-50 font-medium flex items-center"
                  onClick={toggleDropdown}
                >
                  <FaBook className="mr-2" /> All Books
                </NavLink>
                <NavLink
                  to="/addbooks"
                  className="block px-4 py-3 text-gray-800 hover:bg-blue-50 font-medium flex items-center"
                  onClick={toggleDropdown}
                >
                  <FaPlusCircle className="mr-2" /> Add Books
                </NavLink>
                <NavLink
                  to="/borrowed"
                  className="block px-4 py-3 text-gray-800 hover:bg-blue-50 font-medium flex items-center"
                  onClick={toggleDropdown}
                >
                  <FaBook className="mr-2" /> Borrowed Books
                </NavLink>
              </>
            )}

            {!user && (
              <>
                <NavLink
                  to="/reg"
                  className="block px-4 py-3 text-gray-800 hover:bg-blue-50 font-medium flex items-center"
                  onClick={toggleDropdown}
                >
                  <FaUserPlus className="mr-2" /> Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="block px-4 py-3 text-gray-800 hover:bg-blue-50 font-medium flex items-center"
                  onClick={toggleDropdown}
                >
                  <FaSignInAlt className="mr-2" /> Login
                </NavLink>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleDropdown();
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
