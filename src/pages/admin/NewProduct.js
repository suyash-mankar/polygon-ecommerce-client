import React, { Fragment, useEffect, useState } from "react";
import "../../styles/admin/newProduct.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { Button } from "react-bootstrap";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import LinkIcon from "@mui/icons-material/Link";
import AppsIcon from "@mui/icons-material/Apps";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState();
  const [creator, setCreator] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [chain, setChain] = useState("");
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const createProductSubmitHandler = (e) => {
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

    dispatch(createProduct(myForm));
  };

  const createProductImageChange = (e) => {
    const file = e.target.files[0];

    setImage();
    setImagePreview();

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
            onSubmit={createProductSubmitHandler}
          >
            <h1 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              Create Product
            </h1>

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
              <InventoryIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <LinkIcon />
              <input
                type="text"
                placeholder="Blockchain"
                required
                value={chain}
                onChange={(e) => setChain(e.target.value)}
              />
            </div>
            <div>
              <AppsIcon />
              <input
                type="text"
                placeholder="Collection Name"
                required
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </div>
            <div>
              <AccountBoxIcon />
              <input
                type="text"
                placeholder="Creator"
                required
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>
            <div
              className="label"
              style={{ marginTop: "5px", fontWeight: "500" }}
            >
              <span>Product Image</span>
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImageChange}
              />
            </div>

            {imagePreview && (
              <div id="createProductFormImage">
                <img src={imagePreview} alt="Product Preview" />
              </div>
            )}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create Product
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
