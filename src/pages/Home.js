import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllProducts, addProductToCart } from "../services/apis";
import { urls, base_url } from "../services/urls";
import "../styles/home.scss";

function Home({
  addToCartCount,
  setAddToCartCount,
  addToCartProducts,
  setAddToCartProducts,
}) {
  const [allProducts, setAllProducts] = useState([]);

  // useEffect(() => {
  //   async function getAllProductsFnc() {
  //     let data = await getAllProducts(urls.getAllProducts);
  //     setAllProducts(data.products);
  //   }
  //   getAllProductsFnc();
  // }, []);

  const handleAddToCart = (product) => {
    setAddToCartProducts([...addToCartProducts, product]);
    setAddToCartCount(addToCartCount + 1);

    // addProductToCart(urls.addProductToCart, product);
  };

  const products = [
    {
      name: "Piece of Magic Commemoration #5381",
      image: {
        url: "https://www.arweave.net/V90iW782DbOqb4M6TGxUJVSSufBwlCagzQCR9v_dfQc?ext=png",
      },
      price: "200",
      _id: "akskjal",
    },
    {
      name: "Piece of Magic Commemoration #5381",
      image: {
        url: "https://www.arweave.net/V90iW782DbOqb4M6TGxUJVSSufBwlCagzQCR9v_dfQc?ext=png",
      },
      price: "200",
      _id: "aksjfkjal",
    },
    {
      name: "Piece of Magic Commemoration #5381",
      image: {
        url: "https://www.arweave.net/V90iW782DbOqb4M6TGxUJVSSufBwlCagzQCR9v_dfQc?ext=png",
      },
      price: "200",
      _id: "aksja;l",
    },
    {
      name: "Piece of Magic Commemoration #5381",
      image: {
        url: "https://www.arweave.net/V90iW782DbOqb4M6TGxUJVSSufBwlCagzQCR9v_dfQc?ext=png",
      },
      price: "200",
      _id: "ajfkja;l",
    },
    {
      name: "Piece of Magic Commemoration #5381",
      image: {
        url: "https://www.arweave.net/V90iW782DbOqb4M6TGxUJVSSufBwlCagzQCR9v_dfQc?ext=png",
      },
      price: "200",
      _id: "asjfkja;l",
    },
    {
      name: "Piece of Magic Commemoration #5381",
      image: {
        url: "https://www.arweave.net/V90iW782DbOqb4M6TGxUJVSSufBwlCagzQCR9v_dfQc?ext=png",
      },
      price: "200",
      _id: "aksjfkja",
    },
  ];

  return (
    <div className="home_container">
      <div className="all_products_container">
        {products.map((product) => {
          return (
            <div key={product._id} className="product_card">
              <img
                src={product.image.url}
                alt="product"
                className="product_img"
              />

              <div className="product_details">
                <p>collection: {product.name}</p>
                <p>{product.name}</p>
                <p>Price: ${product.price}</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
