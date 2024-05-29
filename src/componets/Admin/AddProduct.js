import React, { useEffect, useState } from "react";
import "./Addproduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StorageIcon from "@mui/icons-material/Storage";
import { clearErros, createNewProduct } from "../actions/productActions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import { NEW_PRODUCT_RESET } from "../Constants/productConstant";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProducts);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "Footwear",
    "Jackets",
    "Blazers",
    "Jumpsuits",
    "Sportswear",
    "Kurti",
    "Swimwear",
    "Jeans",
    "Shirts",
    "Laptop",
    "Smartphone",
    "Bedsheets",
    "Accerssories",
  ];
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErros());
    }
    if (success) {
      alert("Product created sucessfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/product");
    }
  }, [error, success, dispatch, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("Name", name);
    myForm.set("Price", price);
    myForm.set("Description", description);
    myForm.set("Category", category);
    myForm.set("Stock", stock);

    images.forEach((img) => {
      myForm.append("avatar", img);

    });
    dispatch(createNewProduct(myForm))
  };
  const createProductOnChange = (e) =>{
    const files = Array.from(e.target.files)
    setImages([])
    setImagePreview([])

    files.forEach((file) =>{
      const reader = new FileReader();

      reader.onload = () =>{
        if(reader.readyState === 2){
          setImagePreview((prevImage) => [
            ...prevImage ,
            reader.result
          ])
          setImages((prevImage) => [...prevImage , reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }
  return (
    <>
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            action=""
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h2>Create Product</h2>

            <div>
              <SpellcheckIcon />
              <input
                type="number"
                placeholder="Price"
                name="Name"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                id=""
                cols="30"
                rows="5"
                placeholder="Product Description"
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="" name="Category">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                name="Stock"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductOnChange}
              />
            </div>

            <div id="createProductFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview" />
              ))}
            </div>

            <Button id="createProductBtn" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
