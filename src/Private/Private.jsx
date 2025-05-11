import { useContext } from "react";

import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../ContexProvider/AuthProvider";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate to="/login"></Navigate>
    </div>
  );
};
Private.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Private;
