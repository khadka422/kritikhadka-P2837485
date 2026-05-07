const admin = (req, res, next) => {
  try {
    console.log("Admin middleware - Checking user role...");
    console.log("User from request:", req.user);

    if (!req.user) {
      console.log("No user found in request");
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    if (req.user.role !== "admin") {
      console.log("User is not admin. Role:", req.user.role);
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    console.log("Admin middleware - User is admin, calling next()");
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in admin check",
    });
  }
};

export default admin;
