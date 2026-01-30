import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        {/* Navbar Layout ke andar saare routes */}
        <Route element={<Navbar />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Protected Routes for Everyone (User & Admin) */}
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            {/* Agar koi extra page banana ho jo sirf login ke baad dikhe */}
            {/* <Route path="/profile" element={<Profile />} /> */}
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
