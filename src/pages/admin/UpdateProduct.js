import React, { Fragment, useEffect, useState } from "react";
import "../../styles/admin/newProduct.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [creator, setCreator] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [chain, setChain] = useState("");
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setCreator(product.creator);
      setCollectionName(product.collectionName);
      setOldImage(product.image);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, id, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("stock", stock);
    myForm.set("creator", creator);
    myForm.set("collectionName", collectionName);
    myForm.set("chain", chain);
    myForm.append("image", image);

    dispatch(updateProduct(id, myForm));
  };

  const updateProductImageChange = (e) => {
    const file = e.target.files[0];

    setImage();
    setImagePreview();
    setOldImage();

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="chain"
                required
                value={chain}
                onChange={(e) => setChain(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="Collection Name"
                required
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="creator"
                required
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImageChange}
              />
            </div>

            {oldImage && (
              <div id="createProductFormImage">
                <img src={oldImage.url} alt="Product Preview" />
              </div>
            )}

            <div id="createProductFormImage">
              <img src={imagePreview} alt="Product Preview" />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
