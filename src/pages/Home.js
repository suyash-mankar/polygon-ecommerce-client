import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllProducts } from "../services/apis";
import { urls, base_url } from "../services/urls";
import "../styles/home.scss";

function Home() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function getAllProductsFnc() {
      let data = await getAllProducts(urls.getAllProducts);
      setAllProducts(data.products);
    }
    getAllProductsFnc();
  }, []);

  return (
    <div className="home_container">
      <div className="all_products_container">
        {allProducts.map((product) => {
          return (
            <div key={product._id} className="product_card">
              <img
                src={base_url + "/" + product.image}
                alt="product"
                className="product_img"
              />

              <div className="product_details">
                <p>collection: {product.collectionName}</p>
                <p>{product.title}</p>
                <p>Price: {product.price}</p>
                <Button variant="primary">Add to cart</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
