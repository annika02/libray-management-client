import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../FireBase/Firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visaId, setVisaId] = useState({});
  // Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //SinIng
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google verification
  const googleVerify = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  // Set Observer
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current user", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubcribe();
    };
  }, []);
  // Update Profile
  const updateData = (updated) => {
    return updateProfile(auth.currentUser, updated);
  };

  //SignOut
  const signout = () => {
    return signOut(auth);
  };

  // Handel Data For His Uniq Id
  const handelVisaDataUniqId = (id) => {
    setVisaId(id);
    console.log("Visa ID stored in context:", id);
  };

  // Send All Functions
  const authInfo = {
    createUser,
    user,
    loading,
    updateData,
    signout,
    signIn,
    googleVerify,
    handelVisaDataUniqId,
    visaId,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
