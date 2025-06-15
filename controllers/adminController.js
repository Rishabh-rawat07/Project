const { v4: uuidv4 } = require("uuid");
const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const { name, batchSize, mrp } = req.body;
    const image = req.file.path;

    const product = new Product({
      name,
      batchSize,
      mrp,
      image,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const generateCodes = async (req, res) => {
  try {
    const { productId, batchNumber } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const batchExists = product.batches.some(
      (b) => b.batchNumber === batchNumber
    );
    if (batchExists) {
      return res.status(400).json({ message: "Batch number already exists" });
    }

    const codes = Array.from({ length: product.batchSize }, () => ({
      code: uuidv4(),
      isUsed: false,
    }));

    product.batches.push({
      batchNumber,
      codes,
    });

    await product.save();

    res.json({
      productId: product._id,
      batchNumber,
      codes: codes.map((c) => c.code),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addProduct, generateCodes };
