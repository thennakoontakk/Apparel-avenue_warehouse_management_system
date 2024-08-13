const express = require("express");
const router = express.Router();
const {
  customerLogin,
  adminAndMangerLogin,
  logoutUser,
  updateCustomer,
  updateAdmin,
  updateManager,
  deleteUser,
  getAllUsers,
  getAllCustomers,
  getAllManagers,
  getAllAdmins,
  getUserById,
  customerRegister,
  adminRegister,
  managerRegister,
  changePassword,
  countCustomers,
  countManagers,
  countAdmins,
  countCustomersRegisteredToday,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const {
  customerAuthentication,
  adminAuthentication,
  managerAuthentication,
} = require("../middleware/authentication");

// Register a new customer
router.post("/register-customer", customerRegister);

// Register a new admin
router.post("/register-admin", adminRegister);

// Register a new manager
router.post("/register-manager", managerRegister);

// Login a customer
router.post("/login-customer", customerLogin);

// Login an admin or manager
router.post("/login-adminAndManager", adminAndMangerLogin);

// Logout a user
router.post("/logout", protect, logoutUser);

// Get all users (requires authentication and admin access)
router.get("/", protect, adminAuthentication, getAllUsers);

// Get all customers (requires authentication and admin access)
router.get("/allcustomers", protect, adminAuthentication, getAllCustomers);

// Get all managers (requires authentication and admin access)
router.get("/allmanagers", protect, adminAuthentication, getAllManagers);

// Get all admins (requires authentication and admin access)
router.get("/allAdmins", protect, adminAuthentication, getAllAdmins);

// Get user by ID (requires authentication)
router.get("/get/:id", protect, getUserById);

// Update customer (requires authentication and customer access)
router.put(
  "/update-customer/:Id",
  protect,
  customerAuthentication,
  updateCustomer
);

// Update admin (requires authentication and admin access)
router.put("/update-admin/:Id", protect, adminAuthentication, updateAdmin);

// Update manager (requires authentication and manager or admin access)
router.put(
  "/update-manager/:Id",
  protect,
  managerAuthentication,
  updateManager
);

// Delete user (requires authentication and admin access)
router.delete("/delete/:id", protect, adminAuthentication, deleteUser);

// Change password (requires authentication)
router.put("/change-password/:id", protect, changePassword);

// Counts (requires authentication and admin access)
router.get("/customers/count", protect, adminAuthentication, countCustomers);
router.get("/managers/count", protect, adminAuthentication, countManagers);
router.get("/admins/count", protect, adminAuthentication, countAdmins);

// New customers registered today (requires authentication and admin access)
router.get(
  "/customers/count/today",
  protect,
  adminAuthentication,
  countCustomersRegisteredToday
);

module.exports = router;
