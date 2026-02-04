const Products = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = await Products.create({ name, price, image });
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
      // Regex ko safely handle karne ke liye hum RegExp constructor use karte hain
      filter = {
        name: { $regex: new RegExp(search, 'i') } 
      };
    }

    const products = await Products.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

module.exports = { addProduct, getAllProducts };