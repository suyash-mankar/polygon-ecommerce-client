import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return redirect("/user/login");
    }

    if (isAdmin === true && user.role !== "admin") {
      return redirect("/user/login");
    }
  }

  return children;
};

export default ProtectedRoute;
