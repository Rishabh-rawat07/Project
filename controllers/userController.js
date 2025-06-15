const Product = require("../models/Product");

const searchByCode = async (req, res) => {
  try {
    const { code } = req.body;

    const product = await Product.findOne({
      "batches.codes.code": code,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let batchInfo = null;
    let codeInfo = null;

    for (const batch of product.batches) {
      const foundCode = batch.codes.find((c) => c.code === code);
      if (foundCode) {
        batchInfo = batch;
        codeInfo = foundCode;
        break;
      }
    }

    if (!codeInfo) {
      return res.status(404).json({ message: "Code not found" });
    }

    res.json({
      product: {
        name: product.name,
        mrp: product.mrp,
        image: product.image,
      },
      batchNumber: batchInfo.batchNumber,
      code: codeInfo.code,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { searchByCode };
