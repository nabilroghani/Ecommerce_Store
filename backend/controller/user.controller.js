const Products = require("../model/user.model");
const jwt = require("jsonwebtoken");

const addProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = await Products.create({ name, price, image });

    const token = jwt.sign({ name, price, image }, process.env.SECRET_TOKEN, {
      expiresIn: "3h",
    });

    res.status(201).json({ message: "Data succesfully Sand", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.stutus(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = { addProduct, getAllProducts };
