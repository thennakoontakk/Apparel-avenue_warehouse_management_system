// Middleware function to authenticate admin users
module.exports.adminAuthentication = (req, res, next) => {
  // Check if the user's role is not Admin
  if (req.user.role !== "Admin") {
    // If not Admin, return a 401 Unauthorized status with an error message
    return res.status(401).json({
      err: "Access Denied",
    });
  }
  // If the user is Admin, continue to the next middleware or route handler
  next();
};

// Middleware function to authenticate customer users
module.exports.customerAuthentication = (req, res, next) => {
  // Check if the user's role is not a customer
  if (req.user.role !== "Customer") {
    // If not Student, return a 401 Unauthorized status with an error message
    return res.status(401).json({
      err: "Access Denied",
    });
  }
  // If the user is customer, continue to the next middleware or route handler
  next();
};

// Middleware function to authenticate faculty or admin users
module.exports.managerAuthentication = (req, res, next) => {
  // Check if the user's role is neither manager nor Admin
  if (req.user.role !== "Manager" || req.user.role !== "Admin") {
    // If not manager or Admin, return a 401 Unauthorized status with an error message
    return res.status(401).json({
      err: "Access Denied",
    });
  }
  // If the user is either manager or Admin, continue to the next middleware or route handler
  next();
};
