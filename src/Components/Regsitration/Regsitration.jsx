import { useContext, useEffect, useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../ContexProvider/AuthProvider";
import background from "../../assets/background.jpg";
const Registration = () => {
  const { createUser, updateData, user } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  console.log(user);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const handelReg = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const imgUrl = e.target.imgUrl.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        updateData({ displayName: name, photoURL: imgUrl }).then(() => {
          if (result.user) {
            console.log("Update successful, triggering success toast");
            toast.success(
              `Thank you, ${name}! Your registration was successful.`
            );
            navigate("/"); // Navigate to Home page after successful registration
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Registration failed! Please try again.");
      });
  };
  const showToast = () => {
    if (!user.emailVerified) {
      console.log("Your Email not varified try agian later");
      toast.error(`Please Give Valide Information.`);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-md mx-auto p-6 bg-transparent rounded shadow mt-4 ">
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
        <ToastContainer />
        <form onSubmit={handelReg}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              name="name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photoUrl"
              className="block text-gray-700 font-medium"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photoUrl"
              name="imgUrl"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            onClick={showToast}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <div>
            <span className="text-green-500 font-semibold">
              If you already have an account click to{" "}
              <NavLink
                className="text-blue-500 underline font-bold"
                to="/login"
              >
                Loging
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
