import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../actions/userAction";
import "../styles/navbar.scss";

function NavbarComp({ addToCartCount }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    toast.success("logout successfull");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="outer_nav_container">
        <Link to="/" className="logoLink">
          <Navbar.Brand style={{ fontSize: "1.5rem", fontFamily: "monospace" }}>
            <img
              src="https://seeklogo.com/images/G/google-issue-tracker-logo-2D1EE93213-seeklogo.com.png"
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

          {isAuthenticated && (
            <p className="link" onClick={logoutUser}>
              LogOut
            </p>
          )}

          {user?.role === "admin" && (
            <Link to="/dashboard" className="link">
              Admin Dashboard
            </Link>
          )}
        </Container>

        <div style={styles.cartIconContainer}>
          <img
            style={styles.cartIcon}
            src="https://cdn-icons-png.flaticon.com/512/9374/9374328.png"
            alt="cart-icon"
          />
          <span style={styles.cartCount}> {addToCartCount} </span>
        </div>
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
