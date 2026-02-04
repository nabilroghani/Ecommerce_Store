import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import AdminOrders from "./pages/AdminDashboard";
import OrderSuccessfull from "./pages/OrderSuccessfull";
import NotFound from "./pages/NotFound"; 

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Routes>
        <Route element={
          <>
            <Navbar />
            <div className="flex-grow">
            </div>
            <Footer /> 
          </>
        }>
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/cart-page" element={<CartPage/>}/>

          {/* Protected Routes (User & Admin) */}
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
             <Route path="/checkout" element={<Checkout/>}/>
             <Route path="/my-orders" element={<OrderHistory/>}/>
             <Route path="/order-successfull" element={<OrderSuccessfull />}/>
          </Route>

          {/* Admin Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;