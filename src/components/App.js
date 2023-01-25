import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  LoginPage,
  SignupPage,
  Admin,
  AdminOrdersPage,
  AdminProductsPage,
  AdminNewProductPage,
  ProductDetails,
} from "../pages";
import NavbarComp from "./NavbarComp";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [addToCartProducts, setAddToCartProducts] = useState([]);
  const [addToCartCount, setAddToCartCount] = useState(0);

  return (
    <Router>
      <NavbarComp addToCartCount={addToCartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCartCount={addToCartCount}
              setAddToCartCount={setAddToCartCount}
              addToCartProducts={addToCartProducts}
              setAddToCartProducts={setAddToCartProducts}
            />
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
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
