import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-products" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
