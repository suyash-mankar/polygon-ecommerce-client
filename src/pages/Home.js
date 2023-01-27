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
  // const [searchText, setSearchText] = useState("");
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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchFilter = (e) => {
    const searchWord = e.target.value;
    if (searchWord === "") {
      setFilteredProducts(products);
    }
    const searchedProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredProducts(searchedProducts);
  };

  return (
    <div className="home_container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="filters_container">
            <h3>Filters:</h3>
            <div className="search_filter">
              <p>search by Product Title:</p>
              <input
                type="text"
                onChange={handleSearchFilter}
                placeholder="Enter Product Title"
              />
            </div>
          </div>

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
                          <Button
                            variant="primary"
                            onClick={() => {
                              addToCartHandler(product._id);
                            }}
                          >
                            Add to cart
                          </Button>
                        </div>
                      </Link>
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
