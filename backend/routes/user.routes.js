const express = require("express");
const {
  addProduct,
  getAllProducts,
} = require("../controller/product.controller");
const { registerUser, loginUser } = require("../controller/user.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const { placeOrder, getMyOrders, updateOrderStatus, getAllOrders } = require("../controller/order.controller"); 

const route = express.Router();

// --- Product Routes ---
// Product add karna sirf Admin ka kaam hai
route.post("/add-products", verifyToken, isAdmin, addProduct); 
route.get("/all", getAllProducts);
route.get("/admin/orders", verifyToken, isAdmin, getAllOrders);
route.put("/admin/order/:id/status", verifyToken, isAdmin, updateOrderStatus);

// --- User Routes ---
route.post("/register", registerUser);
route.post("/login", loginUser);

// --- Order Routes ---
route.post("/place-order", verifyToken, placeOrder); 
route.get("/my-orders", verifyToken, getMyOrders);

module.exports = { route };