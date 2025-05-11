import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import "./Nav.css";

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
    <>
      <div
        className={`mt-2 w-11/12 h-14 mx-auto flex flex-row justify-between items-center ${
          user ? "user-logged-in" : ""
        }`}
      >
        {/* Logo Div */}
        <div className="  w-[20%] h-full rounded-full overflow-hidden">
          <span className="text-3xl font-serif font-bold text-yellow-400">
            LR-<span className="text-green-400">Shelf</span>
          </span>
        </div>

        {/* Route Div */}
        <div className="flex flex-row gap-3 font-bold hidden md:flex">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            Home
          </NavLink>
          {user && (
            <div className="flex gap-2">
              <NavLink
                to="/allbooks"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                All Books
              </NavLink>
              <NavLink
                to="/addbooks"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Add Books
              </NavLink>
              <NavLink
                to="/borrowed"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Borrowed Books
              </NavLink>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <span className="text-sm font-serif font-bold text-yellow-400">
            LR-<span className="text-green-400">Shelf</span>
          </span>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="iconn md:hidden">
          <button onClick={toggleDropdown} className="text-3xl">
            &#9776; {/* Hamburger icon */}
          </button>
        </div>

        {/* Reg & Login Div */}
        <div className="w-[30%] h-full flex gap-3 justify-center items-center">
          {!user && (
            <div>
              <NavLink to="/reg">
                <button className="regDiv  p-2 hover:bg-red-100 bg-green-100 rounded-md btn-custom font-bold text-black">
                  Registration
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="regDiv  p-2 hover:bg-gray-100 bg-red-100 rounded-md btn-custom font-bold text-black">
                  Login
                </button>
              </NavLink>
            </div>
          )}
          {user && (
            <div className="relative group w-40 h-[120px] flex items-center bg-transparent">
              {/* User Photo */}
              <img
                src={userPhoto}
                alt="User Image"
                className="w-10 h-10 mx-auto rounded-full border-2 border-gray-300 shadow-md ml-[20px]"
              />

              {/* Dropdown Menu */}
              <div className="absolute hidden group-hover:flex flex-col items-center top-12 left-1/2 -translate-x-1/2 bg-white w-40 py-2 rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mt-6">
                <div className="px-3 py-1 w-full text-center text-gray-700 font-semibold bg-gray-100 rounded-t-lg">
                  <h1>{user.displayName}</h1>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-3/4 px-4 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {dropdownVisible && (
        <div className="md:hidden absolute top-16 left-1/2 -translate-x-1/2 bg-white w-11/12 py-3 rounded-lg shadow-lg z-10">
          <NavLink
            to="/"
            className="block text-center py-2 text-lg font-bold text-gray-800"
          >
            Home
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/allbooks"
                className="block text-center py-2 text-lg font-bold text-gray-800"
              >
                All Books
              </NavLink>
              <NavLink
                to="/addbooks"
                className="block text-center py-2 text-lg font-bold text-gray-800"
              >
                Add Books
              </NavLink>
              <NavLink
                to="/borrowed"
                className="block text-center py-2 text-lg font-bold text-gray-800"
              >
                Borrowed Books
              </NavLink>
            </>
          )}
          {!user && (
            <>
              <NavLink
                to="/reg"
                className="block text-center py-2 text-lg font-bold text-gray-800"
              >
                Registration
              </NavLink>
              <NavLink
                to="/login"
                className="block text-center py-2 text-lg font-bold text-gray-800"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}

      <hr className="w-full h-[0.5px] bg-yellow-100 mt-1" />
    </>
  );
};

export default Navbar;
