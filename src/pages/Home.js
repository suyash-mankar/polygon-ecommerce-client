import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "../styles/home.scss";
import Loader from "../components/Loader";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    // setAddToCartProducts([...addToCartProducts, product]);
    // setAddToCartCount(addToCartCount + 1);
  };

  return (
    <div className="home_container">
      {loading ? (
        <Loader />
      ) : (
        <div className="all_products_container">
          {products &&
            products.map((product) => {
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
      )}
    </div>
  );
}

export default Home;
