import React from "react";
import { Link, Outlet } from "react-router-dom"; // Outlet zaroori hai

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between bg-blue-300 p-4">
        <h1 className="font-bold">Shop</h1>
        <ul className="flex justify-between gap-4">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/add-products"}>Add Product</Link>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
