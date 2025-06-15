const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batchSize: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  batches: [
    {
      batchNumber: String,
      codes: [
        {
          code: {
            type: String,
            default: uuidv4,
          },
          isUsed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
