import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./componets/Home/Home.js";
import Navbar from "./componets/Layouts/Navbar.js";
import Product from "./componets/Products/Product.js";
import AddProduct from "./componets/Admin/AddProduct.js";
import Contact from "./componets/Contact/Contact.js";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/admin" element={<AddProduct/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </>
  );
}

export default App;
