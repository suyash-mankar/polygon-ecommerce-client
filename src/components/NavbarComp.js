import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

function NavbarComp() {
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
          <Link to="/customer/login" className="link">
            Sign In
          </Link>
          <Link to="/customer/signup" className="link">
            Sign Up
          </Link>
          <Link to="/admin/products" className="link">
            <Button variant="outline-light"> Admin </Button>
          </Link>
        </Container>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
