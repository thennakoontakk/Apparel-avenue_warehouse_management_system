// userRoutes.js
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
const { customerAuthentication } = require("../middleware/authentication");

// Register a new customer
router.post("/register-customer", customerRegister);

// Register a new admin
router.post("/register-admin", adminRegister);

// Register a new manager
router.post("/register-manager", managerRegister);

// Login a user
router.post("/login-customer", customerLogin);

// Login a user
router.post("/login-adminAndManger", adminAndMangerLogin);

// Logout a user
router.post("/logout", logoutUser);

// Get all users
router.get("/", getAllUsers);

// Get all custoemrs
router.get("/allcustomers", getAllCustomers);

// Get all managers
router.get("/allmanagers", getAllManagers);

// Get all admins
router.get("/allAdmins", getAllAdmins);

// Get user by ID
router.get("/get/:id", getUserById);

// Update user
router.put("/update-customer/:Id", updateCustomer);

// Update admin
router.put("/update-admin/:Id", updateAdmin);

// Update manager
router.put("/update-manager/:Id", updateManager);

// Delete user
router.delete("/delete/:id", deleteUser);

//changepassword
router.put("/change-password/:id", changePassword);

//counts
router.get("/customers/count", countCustomers);
router.get("/managers/count", countManagers);
router.get("/admins/count", countAdmins);

//new customers registered today
router.get("/customers/count/today", countCustomersRegisteredToday);

module.exports = router;
