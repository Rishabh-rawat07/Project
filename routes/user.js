const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { searchByCode } = require("../controllers/userController");

router.use(auth(["user", "admin"]));

router.post("/search", searchByCode);
router.get("/dashboard/stats", auth(["user", "admin"]), async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const codes = await Code.countDocuments();
    res.json({
      products,
      codes,
      activity: 42,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
