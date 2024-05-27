import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./componets/Home/Home.js";
import Navbar from "./componets/Layouts/Navbar.js";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
