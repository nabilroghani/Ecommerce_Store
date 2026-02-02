const express = require("express");
const {
  addProduct,
  getAllProducts,
} = require("../controller/product.controller");
const { registerUser, loginUser } = require("../controller/user.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const { placeOrder, getMyOrders } = require("../controller/order.controller"); 

const route = express.Router();

// --- Product Routes ---
// Product add karna sirf Admin ka kaam hai
route.post("/add-products", verifyToken, isAdmin, addProduct); 
route.get("/all", getAllProducts);

// --- User Routes ---
route.post("/register", registerUser);
route.post("/login", loginUser);

// --- Order Routes ---
route.post("/place-order", verifyToken, placeOrder); 
route.get("/my-orders", verifyToken, getMyOrders);

module.exports = { route };