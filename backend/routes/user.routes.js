const express = require("express");
const { getAllProducts, addProduct } = require("../controller/user.controller");

const route = express.Router();

route.post("/add-products", addProduct);
route.get("/", getAllProducts);

module.exports = { route };
