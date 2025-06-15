const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const tokenDoc = await Token.findOne({ token, user: decoded.id });
      if (!tokenDoc) throw new Error();

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({ message: "Please authenticate" });
    }
  };
};

module.exports = auth;
