import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log("loading", loading);
  console.log("isAuthenticated", isAuthenticated);

  if (loading === false) {
    if (isAuthenticated === false) {
      console.log("inside");
      return navigate("/user/login");
    }

    if (isAdmin === true && user.role !== "admin") {
      return navigate("/user/login");
    }
  }

  console.log("children", children);
  console.log("isAdmin", isAdmin);

  return children;
};

export default ProtectedRoute;
