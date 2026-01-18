import { CloudCog } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);

const location = useLocation();

  return user?._id ? children : <Navigate to="/login" state={{ from: location.pathname }}></Navigate>;

  
};

export default ProtectedRoute;
