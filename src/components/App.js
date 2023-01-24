import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  LoginPage,
  SignupPage,
  Admin,
  AdminOrdersPage,
  AdminProductsPage,
  AdminNewProductPage,
} from "../pages";
import NavbarComp from "./NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer/login" element={<LoginPage />} />
        <Route path="/customer/signup" element={<SignupPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/products/new" element={<AdminNewProductPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
