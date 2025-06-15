const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { addProduct, generateCodes } = require("../controllers/adminController");
const { getProducts } = require("../controllers/productController");

router.use(auth(["admin"]));

router.get("/products", getProducts);

router.post("/products", upload.single("image"), addProduct);
router.post("/products/generate-codes", generateCodes);

module.exports = router;
