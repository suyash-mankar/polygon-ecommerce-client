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
import Filters from "../components/Filters";

function Home() {
  const [filteredProducts, setFilteredProducts] = useState([]);

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
        <>
          <Filters
            products={products}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />

          <div
            className="all_products_container"
            style={filteredProducts.length === 0 ? { height: "100vh" } : null}
          >
            {filteredProducts.length === 0 ? (
              <h1 style={{ color: "white" }}> No Products Found</h1>
            ) : (
              <>
                {products &&
                  filteredProducts.map((product) => {
                    return (
                      <div key={product._id} className="product_card">
                        <Link
                          to={`/products/${product._id}`}
                          className="product_card_clickable"
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
                          </div>
                        </Link>

                        <Button
                          variant="primary"
                          onClick={() => {
                            addToCartHandler(product._id);

                          }}
                          className="addtocart_btn"
                        >
                          Add to cart
                        </Button>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
