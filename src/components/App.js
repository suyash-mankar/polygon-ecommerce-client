import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  LoginPage,
  SignupPage,
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
import axios from "axios";
import Payment from "../pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "../pages/OrderSuccess";
import Dashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/ProductList";
import { NewProduct } from "../pages/admin/NewProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import OrderList from "../pages/admin/OrderList";
import ProcessOrder from "../pages/admin/ProcessOrder";

function App() {
  const [addToCartCount, setAddToCartCount] = useState(0);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      process.env.REACT_APP_MODE === "production"
        ? `${process.env.REACT_APP_SERVER_URL}/payment/stripeapikey`
        : `/payment/stripeapikey`,
      { withCredentials: "true" }
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    // if (isAuthenticated) {
    getStripeApiKey();
    // }
  }, []);

  return (
    <Router>
      <NavbarComp addToCartCount={addToCartCount} />

      <Routes>
        <Route path="/" element={<Home />} />
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
              <ConfirmOrder stripeApiKey={stripeApiKey} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/process"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            )
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/admin/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
