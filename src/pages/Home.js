import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { clearErrors, getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "../styles/home.scss";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { addItemsToCart } from "../actions/cartAction";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  let { keyword } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword));
  }, [dispatch]);

  const addToCartHandler = (id) => {
    dispatch(addItemsToCart(id, 1));
    toast.success("Item added to cart");
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
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className="product_card"
                >
                  <img
                    src={product.image.url}
                    alt="product"
                    className="product_img"
                  />

                  <div className="product_details">
                    <p className="collection_name">
                      {product.collectionName}
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
                        alt="verified-icon"
                        style={{ width: "20px", marginLeft: "5px" }}
                      />
                    </p>
                    <p className="product_title">{product.title}</p>
                    <p className="product_price">
                      <span>Price:</span> ${product.price}
                    </p>
                    <p className="product_chain">
                      <span>Chain:</span> {product.chain}
                    </p>
                    {/* <Button
                      variant="primary"
                      onClick={() => {
                        addToCartHandler(product._id);
                      }}
                    >
                      Add to cart
                    </Button> */}
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Home;
