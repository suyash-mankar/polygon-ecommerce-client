import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../actions/productAction";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "../styles/productDetails.scss";
import { addItemsToCart } from "../actions/cartAction";

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

          <div className="product_details_container">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>price: ${product.price}</p>
            <p>{product.creator}</p>
            <p>{product.collectionName}</p>
            <p>{product.chain}</p>

            <div className="qty_btn_container">
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button
              disabled={product.stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>

            <p>
              Status:
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
