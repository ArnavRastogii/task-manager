const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ No header
  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  // ✅ Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};