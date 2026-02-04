import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaCartShopping, FaBars, FaXmark, FaBoxOpen, FaClipboardList, FaMagnifyingGlass } from "react-icons/fa6";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    navigate("/login");
  };

  // --- SEARCH FIX ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Agar Home page par hi products hain toh "/" use karein
      navigate(`/?search=${searchQuery}`); 
      setIsOpen(false);
    } else {
      navigate("/"); // Khali search par wapas home
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Fashion fusion</span>
            </Link>

            {/* --- SEARCH BOX (Desktop) --- */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-gray-100 border-none rounded-full py-2 px-5 pr-10 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600">
                <FaMagnifyingGlass />
              </button>
            </form>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-6 font-medium text-gray-600">
                <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                
                {token && role === "user" && (
                  <Link to="/my-orders" className="hover:text-blue-600 flex items-center gap-1 transition">
                    <FaBoxOpen /> My Orders
                  </Link>
                )}

                {token && role === "admin" && (
                  <>
                    <Link to="/add-products" className="text-blue-700 font-semibold hover:text-blue-800 transition">+ Add Product</Link>
                    <Link to="/admin-orders" className="text-purple-600 font-semibold flex items-center gap-1 hover:text-purple-800 transition">
                      <FaClipboardList /> All Orders
                    </Link>
                  </>
                )}
              </div>

              {/* --- CART ICON (Admin FIX) --- */}
              {/* Is condition se admin ko cart kabhi nahi dikhega */}
              {role !== "admin" && (
                <Link to="/cart-page" className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                  <FaCartShopping size={22} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Auth Buttons */}
              <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
                {!token ? (
                  <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">Login</Link>
                ) : (
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm">
                    Logout
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-3">
               {/* Cart Mobile (Only for non-admins) */}
               {role !== "admin" && (
                 <Link to="/cart-page" className="relative p-2 text-gray-600">
                   <FaCartShopping size={20} />
                   {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-1.5">{cartCount}</span>}
                 </Link>
               )}
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
                {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg">
            {/* Search (Mobile) */}
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-100 border-none rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-3 text-gray-400">
                <FaMagnifyingGlass />
              </button>
            </form>

            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium px-2">Home</Link>
            
            {token && role === "user" && (
              <Link to="/my-orders" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium px-2">My Orders</Link>
            )}

            {token && role === "admin" && (
              <>
                <Link to="/add-products" onClick={() => setIsOpen(false)} className="block text-blue-600 font-semibold px-2">+ Add Product</Link>
                <Link to="/admin-orders" onClick={() => setIsOpen(false)} className="block text-purple-600 font-semibold px-2">All Orders</Link>
              </>
            )}

            {!token ? (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center bg-blue-600 text-white py-2 rounded-lg">Login</Link>
            ) : (
              <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-medium">Logout</button>
            )}
          </div>
        )}
      </nav>

      {/* Pages Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;