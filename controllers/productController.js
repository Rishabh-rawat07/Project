const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-batches.codes");

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

module.exports = {
  getProducts,
};
