// middleware/role.js

exports.isAdmin = (req, res, next) => {
  // ✅ check if user exists
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only access",
    });
  }

  next();
};