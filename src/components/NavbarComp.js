import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../actions/userAction";
import "../styles/navbar.scss";

function NavbarComp() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    toast.success("logout successfull");
  };

  let cartQty = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartQty += cartItems[i].quantity;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container className="outer_nav_container">
        <Link to="/" className="logoLink">
          <Navbar.Brand style={{ fontSize: "1.5rem", fontFamily: "monospace" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/7747/7747255.png"
              alt="brandLogo"
              className="logo"
            />
            NFT-ECOMMERCE
          </Navbar.Brand>
        </Link>

        <Container className="logo_links_container">
          {!isAuthenticated && (
            <Link to="/user/login" className="link">
              Sign In
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/user/register" className="link">
              Sign Up
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="link">
              Admin Dashboard
            </Link>
          )}

          {isAuthenticated && (
            <div className="link" onClick={logoutUser}>
              LogOut
            </div>
          )}
        </Container>

        <Link to="/cart" style={styles.cartIconContainer}>
          <img
            style={styles.cartIcon}
            src="https://cdn-icons-png.flaticon.com/512/9374/9374328.png"
            alt="cart-icon"
          />
          <span style={styles.cartCount}> {cartQty} </span>
        </Link>
      </Container>
    </Navbar>
  );
}

const styles = {
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  nav: {
    height: 50,
    background: "#4267b2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "1px 8px",
    position: "absolute",
    right: 5,
    top: -5,
  },
};

export default NavbarComp;
