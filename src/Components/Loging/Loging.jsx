import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContexProvider/AuthProvider";

import Swal from "sweetalert2";

const Loging = () => {
  const { signIn, googleVerify } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((res) => {
        console.log(res.user);

        Swal.fire({
          icon: "success",
          title: "Successfully Loging",
          text: "The book has been deleted from your borrowed list.",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        //  navigate('/')
      })
      .then((error) => {
        console.log("Error", error);
      });
  };

  const signInWithGoogle = () => {
    googleVerify().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-transparent rounded shadow ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Login
          </button>
          <span className="text-gray-600 mt-3 font-light underline text-sm">
            Forget Password
          </span>
          <div>
            <span className="text-green-500 font-semibold">
              If you already have an account click to{" "}
              <NavLink
                className="text-blue-500 underline font-bold"
                to="/register"
              >
                Reg..
              </NavLink>
            </span>
          </div>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-between">
          <span className="w-1/5 border-b"></span>
          <span className="text-sm text-gray-500">OR</span>
          <span className="w-1/5 border-b"></span>
        </div>

        {/* Google Login */}
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center w-full px-4 py-2 text-gray-600 bg-gray-100 border rounded-md hover:bg-gray-200 transition-all focus:ring-2 focus:ring-gray-400 focus:outline-none"
        >
          <FcGoogle className="text-xl mr-6" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Loging;
