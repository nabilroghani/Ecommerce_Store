import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";


const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route element={<Navbar />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/cart-page" element={<CartPage/>}/>

          {/* Protected Routes for Everyone (User & Admin) */}
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
             {/* Checkout yahan hona chahiye taake dono orders kar sakein */}
             <Route path="/checkout" element={<Checkout/>}/>
             <Route path="/my-orders" element={<OrderHistory/>}/>
          </Route>

          {/* Strictly Admin Only */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/add-products" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
