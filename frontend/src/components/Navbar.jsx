import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white shadow-md px-8 py-4 sticky top-0 z-50">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
          <Link to="/">E-SHOP</Link>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="flex gap-6 font-medium text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>

            {/* Sirf Admin ke liye Add Product Link */}
            {role === "admin" && (
              <li>
                <Link
                  to="/add-products"
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
                >
                  + Add Product
                </Link>
              </li>
            )}
          </ul>

          {/* Auth Buttons */}
          <div className="flex gap-4 border-l pl-8 border-gray-200">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-5 py-2 rounded-xl hover:bg-red-100 transition font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Pages Content Yahan Load Hoga */}
      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
