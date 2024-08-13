// userController.js
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const moment = require("moment");

const generateToken = (Id, role) => {
  return jwt.sign({ Id, role }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

const customerRegister = expressAsyncHandler(async (req, res) => {
  const { fullName, contactNumber, username, email, password } = req.body;

  //Validation
  if (!fullName || !contactNumber || !username || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //check whether the email is a valid one
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email is not valid");
  }

  // Check if password is at least 6 characters long
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  // Check if contactNumber is 10 digits long
  if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
    return res
      .status(400)
      .json({ error: "Contact number must be 10 digits long" });
  }

  let Id;

  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "CU" + randomNum.toString();
  } while (await User.findOne({ id: newId })); // Check if the generated ID already exists

  Id = newId;

  //find if user already exists

  try {
    const existingCustomer = await User.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "email already exists" });
    }

    //Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const newCustomer = new User({
      fullName,
      contactNumber,
      username,
      email,
      password: hashedPassword,
      role: "Customer",
      Id,
    });
    await newCustomer.save();

    if (newCustomer) {
      res.status(201).json({
        id: newCustomer.Id,
        fullName: newCustomer.fullName,
        contactNumber: newCustomer.contactNumber,
        username: newCustomer.username,
        email: newCustomer.email,
        role: newCustomer.role,
        token: generateToken(newCustomer._id, newCustomer.role),
        message: "Customer registered successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register customer" });
  }
});

const adminRegister = expressAsyncHandler(async (req, res) => {
  const { fullName, contactNumber, username, email, password } = req.body;

  //Validation
  if (!fullName || !contactNumber || !username || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //check whether the email is a valid one
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email is not valid");
  }

  // Check if password is at least 6 characters long
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  // Check if contactNumber is 10 digits long
  if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
    return res
      .status(400)
      .json({ error: "Contact number must be 10 digits long" });
  }

  let Id;

  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "AD" + randomNum.toString();
  } while (await User.findOne({ Id: newId })); // Check if the generated ID already exists

  Id = newId;

  //find if user already exists

  try {
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "email already exists" });
    }

    //Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const newAdmin = new User({
      fullName,
      contactNumber,
      username,
      email,
      password: hashedPassword,
      role: "Admin",
      Id,
    });
    await newAdmin.save();

    if (newAdmin) {
      res.status(201).json({
        id: newAdmin.Id,
        fullName: newAdmin.fullName,
        contactNumber: newAdmin.contactNumber,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        token: generateToken(newAdmin._id, newAdmin.role),
        message: "Admin registered successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register Admin" });
  }
});

const managerRegister = expressAsyncHandler(async (req, res) => {
  const { fullName, contactNumber, username, managerType, email, password } =
    req.body;

  // Validation
  if (
    !fullName ||
    !contactNumber ||
    !username ||
    !email ||
    !password ||
    !managerType
  ) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check whether the email is a valid one
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email is not valid");
  }

  // Convert input managerType to lowercase
  const inputManagerTypeLowercase = managerType.toLowerCase();

  // Define valid manager types
  const validManagerTypes = [
    "Inventory",
    "Supplier",
    "Transport",
    "Feedback",
    "Finance",
    "Employee",
    "Order",
  ];

  // Convert predefined values to lowercase
  const validManagerTypesLowercase = validManagerTypes.map((type) =>
    type.toLowerCase()
  );

  // Check if input managerType is one of the predefined values, regardless of case
  if (!validManagerTypesLowercase.includes(inputManagerTypeLowercase)) {
    res.status(400);
    throw new Error(
      "Invalid manager type. Must be one of: Inventory, Supplier, Transport, Feedback, Finance, Employee, Order"
    );
  }

  // Check if password is at least 6 characters long
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  // Check if contactNumber is 10 digits long
  if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
    return res
      .status(400)
      .json({ error: "Contact number must be 10 digits long" });
  }

  let Id;

  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "MAN" + randomNum.toString();
  } while (await User.findOne({ Id: newId })); // Check if the generated ID already exists

  Id = newId;

  // Find if user already exists
  try {
    const existingManager = await User.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newManager = new User({
      fullName,
      contactNumber,
      username,
      email,
      password: hashedPassword,
      managerType,
      role: "Manager",
      Id,
    });
    await newManager.save();

    if (newManager) {
      res.status(201).json({
        id: newManager.Id,
        fullName: newManager.fullName,
        contactNumber: newManager.contactNumber,
        email: newManager.email,
        username: newManager.username,
        managerType: newManager.managerType,
        role: newManager.role,
        token: generateToken(newManager._id, newManager.role),
        message: "Manager registered successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register Manager" });
  }
});

const customerLogin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email/username and password" });
    }

    // Find user by email or username and role of "Customer"
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      role: "Customer",
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user.Id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return user details and token
    res.status(200).json({
      userId: user.Id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: token,
      message: "Customer logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const adminAndMangerLogin = async (req, res) => {
  const { role, emailOrUsername, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!role || !emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Please provide role, email/username, and password" });
    }

    // Validate role
    const validRoles = ["Admin", "Manager"];
    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role. Role must be either Admin or Manager" });
    }

    // Find user by email or username and role
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      role: role,
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user.Id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return user details and token
    res.status(200).json({
      userId: user.Id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: token,
      message: `${user.role} logged in successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the token on the client side
    res.clearCookie("token"); // Clear token cookie

    // Send response indicating successful logout
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateCustomer = async (req, res) => {
  const customerId = req.params.Id;
  const { fullName, contactNumber, username, email, password } = req.body;

  try {
    // Check if all required fields are present
    if (!fullName || !contactNumber || !username || !email || !password) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if contactNumber is 10 digits long
    if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
      return res
        .status(400)
        .json({ error: "Contact number must be 10 digits long" });
    }

    // Find the customer by generated ID
    const customer = await User.findOne({ Id: customerId });

    // Check if customer exists
    if (!customer || customer.role !== "Customer") {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Update customer fields
    if (fullName) customer.fullName = fullName;
    if (contactNumber) customer.contactNumber = contactNumber;
    if (username) customer.username = username;
    if (email) customer.email = email;
    if (password) {
      // Hash and update password
      const hashedPassword = await bcrypt.hash(password, 10);
      customer.password = hashedPassword;
    }

    // Save updated customer
    await customer.save();

    res.status(200).json({
      id: customer.Id,
      fullName: customer.fullName,
      contactNumber: customer.contactNumber,
      username: customer.username,
      email: customer.email,
      role: customer.role,
      message: "Customer details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update customer details" });
  }
};

const updateAdmin = async (req, res) => {
  const adminId = req.params.Id; //
  const { fullName, contactNumber, username, email, password } = req.body;

  try {
    // Check if all required fields are present
    if (!fullName || !contactNumber || !username || !email || !password) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if contact number is exactly 10 digits
    if (!/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ error: "Contact number must contain exactly 10 digits" });
    }

    // Find the admin by generated ID
    const admin = await User.findOne({ Id: adminId });

    // Check if admin exists
    if (!admin || admin.role !== "Admin") {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Update admin fields
    if (fullName) admin.fullName = fullName;
    if (contactNumber) admin.contactNumber = contactNumber;
    if (username) admin.username = username;
    if (email) admin.email = email;

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;

    // Save updated admin
    await admin.save();

    res.status(200).json({
      id: admin.Id,
      fullName: admin.fullName,
      contactNumber: admin.contactNumber,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      message: "Admin details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update admin details" });
  }
};

const updateManager = async (req, res) => {
  const managerId = req.params.Id;
  const { fullName, contactNumber, username, email, password, managerType } =
    req.body;

  try {
    // Check if all required fields are present
    if (
      !fullName ||
      !contactNumber ||
      !username ||
      !email ||
      !password ||
      !managerType
    ) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if contact number is exactly 10 digits
    if (!/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ error: "Contact number must contain exactly 10 digits" });
    }

    // Convert input managerType to lowercase
    const inputManagerTypeLowercase = managerType.toLowerCase();

    // Define valid manager types
    const validManagerTypes = [
      "Inventory",
      "Supplier",
      "Transport",
      "Feedback",
      "Finance",
      "Employee",
      "Order",
    ];

    // Convert predefined values to lowercase
    const validManagerTypesLowercase = validManagerTypes.map((type) =>
      type.toLowerCase()
    );

    // Check if input managerType is one of the predefined values, regardless of case
    if (!validManagerTypesLowercase.includes(inputManagerTypeLowercase)) {
      return res.status(400).json({
        error:
          "Invalid manager type. Must be one of: Inventory, Supplier, Transport, Feedback, Finance, Employee, Order",
      });
    }

    // Find the manager by generated ID
    const manager = await User.findOne({ Id: managerId });

    // Check if manager exists
    if (!manager || manager.role !== "Manager") {
      return res.status(404).json({ error: "Manager not found" });
    }

    // Update manager fields
    if (fullName) manager.fullName = fullName;
    if (contactNumber) manager.contactNumber = contactNumber;
    if (username) manager.username = username;
    if (email) manager.email = email;
    if (password) {
      // Hash and update password
      const hashedPassword = await bcrypt.hash(password, 10);
      manager.password = hashedPassword;
    }
    if (managerType) manager.managerType = managerType;

    // Save updated manager
    await manager.save();

    res.status(200).json({
      id: manager.Id,
      fullName: manager.fullName,
      contactNumber: manager.contactNumber,
      username: manager.username,
      email: manager.email,
      managerType: manager.managerType,
      role: manager.role,
      message: "Manager details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update manager details" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by generated ID and role, then delete
    const deletedUser = await User.findOneAndDelete({ Id: userId });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "Customer" }, { password: 0 }); // Exclude password field
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

const getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "Manager" }, { password: 0 }); // Exclude password field
    res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch managers" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "Admin" }, { password: 0 }); // Exclude password field
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ Id: userId }); // Exclude password field ///, { password: 0 }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user by their generated ID
    const user = await User.findOne({ Id: userId });

    if (!user) {
      // If the user with the given ID is not found, return a 404 error
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the current password provided matches the stored password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      // If the current password provided is incorrect, return a 400 error
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    // Return a success message
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    // If an error occurs, return a 500 error
    console.error(error);
    res.status(500).json({ error: "Failed to change password" });
  }
};

const countCustomers = async (req, res) => {
  try {
    const customerCount = await User.countDocuments({ role: "Customer" });
    res.status(200).json({ count: customerCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to count customers" });
  }
};

const countManagers = async (req, res) => {
  try {
    const managerCount = await User.countDocuments({ role: "Manager" });
    res.status(200).json({ count: managerCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to count managers" });
  }
};

const countAdmins = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: "Admin" });
    res.status(200).json({ count: adminCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to count admins" });
  }
};

const countCustomersRegisteredToday = expressAsyncHandler(async (req, res) => {
  try {
    // Get the start and end of the current day
    const startOfDay = moment().startOf("day");
    const endOfDay = moment().endOf("day");

    // Count the number of customers registered between the start and end of the day
    const customerCount = await User.countDocuments({
      role: "Customer",
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    // Send the count as a response
    res.status(200).json({ count: customerCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to count customers registered today" });
  }
});

module.exports = {
  customerRegister,
  adminRegister,
  managerRegister,
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
  changePassword,
  countCustomers,
  countManagers,
  countAdmins,
  countCustomersRegisteredToday,
};
