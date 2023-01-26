import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Home,
  LoginPage,
  SignupPage,
  Admin,
  AdminOrdersPage,
  AdminProductsPage,
  AdminNewProductPage,
  ProductDetails,
  ConfirmOrder,
} from "../pages";
import NavbarComp from "./NavbarComp";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import store from "../store";
import { loadUser } from "../actions/userAction";
import { useSelector } from "react-redux";
import Cart from "../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";
import Shipping from "../pages/Shipping";

function App() {
  const [addToCartProducts, setAddToCartProducts] = useState([]);
  const [addToCartCount, setAddToCartCount] = useState(0);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<SignupPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/user/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/products/new" element={<AdminNewProductPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
