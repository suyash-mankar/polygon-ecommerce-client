import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../actions/productAction";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "../styles/productDetails.scss";
import { addItemsToCart } from "../actions/cartAction";
import { Button } from "react-bootstrap";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  let { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="product_details_container">
          <div className="left_container">
            <div className="image_container">
              {product.image && (
                <img
                  className="product_img"
                  src={`${product.image.url}`}
                  alt="product"
                />
              )}
            </div>
          </div>

          <div className="right_container">
            <div className="collection_creator_container">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                }}
              >
                <span
                  style={{
                    color: "grey",
                    fontWeight: "400",
                    marginRight: "5px",
                  }}
                >
                  Collection:
                </span>
                {product.collectionName}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
                  alt="verified-icon"
                  style={{ width: "20px", marginLeft: "5px" }}
                />
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                }}
              >
                <span
                  style={{
                    color: "grey",
                    fontWeight: "400",
                    marginRight: "5px",
                  }}
                >
                  Creator:
                </span>
                {product.creator}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
                  alt="verified-icon"
                  style={{ width: "20px", marginLeft: "5px" }}
                />
              </p>
            </div>

            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>
              <span>Price:</span> ${product.price}
            </p>
            <p>
              <span>Chain: </span> {product.chain}
            </p>

            <div className="qty_btn_container">
              <p style={{ margin: "0px", fontWeight: "500" }}>Qty: </p>
              <button style={{ marginLeft: "10px" }} onClick={decreaseQuantity}>
                -
              </button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity}>+</button>
            </div>

            <Button
              disabled={product.stock < 1 ? true : false}
              onClick={addToCartHandler}
              className="addtocart_btn"
            >
              Add to Cart
            </Button>

            <p className="stock_status">
              <span>Status:</span>
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
