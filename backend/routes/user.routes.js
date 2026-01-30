const express = require("express");
const {
  addProduct,
  getAllProducts,
} = require("../controller/product.controller");
const { registerUser, loginUser } = require("../controller/user.controller");

const route = express.Router();

route.post("/add-products", addProduct);
route.get("/all", getAllProducts);
route.post("/register", registerUser);
route.post("/login", loginUser);

module.exports = { route };
