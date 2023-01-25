import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/adminNewProductPage.scss";
import { urls } from "../services/urls";
import { createProduct } from "../services/apis";
import { useNavigate } from "react-router-dom";

function AdminNewProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [creator, setCreator] = useState("");
  const [collection, setCollection] = useState("");
  const [chain, setChain] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("creator", creator);
    formData.append("collectionName", collection);
    formData.append("chain", chain);

    // async function createProductFnc() {
    //   let res = await createProduct(urls.createProduct, formData);
    //   if (res.product) {
    //     navigate("/admin");
    //   }
    // }
    // createProductFnc();
  };

  return (
    <div className="new_product_page_container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Submit the photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Qty Available</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product qty"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product qty"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Creator</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product Creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Collection</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product Collection"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Chain</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product Chain"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AdminNewProductPage;
