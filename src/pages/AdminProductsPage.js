import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/adminProductsPage.scss";

function AdminProductsPage() {
  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate("/admin/products/new");
  };

  return (
    <div className="admin_dashboard">
      <div className="heading_container">
        <h4>Products</h4>
        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default AdminProductsPage;
