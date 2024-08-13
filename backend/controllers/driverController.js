const Driver = require("../models/driverModel.js");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
require("dotenv").config();

const addDriver = expressAsyncHandler(async (req, res) => {
  const { fullName, nicNo, email, address, phoneNo, licenseType } = req.body;

  // Validation
  if (!fullName || !nicNo || !email || !address || !phoneNo || !licenseType) {
    return res.status(400).json({ error: "Please include all fields" });
  }

  // Validate NIC format
  const nicRegex = /^(?:[0-9]{9}[vV]?|[0-9]{12})$/;
  if (!nicRegex.test(nicNo)) {
    return res.status(400).json({ error: "Invalid NIC number" });
  }


  // Check whether the email is a valid one
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  let Id;

  let newId;

  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "DR" + randomNum.toString();
  } while (await Driver.findOne({ id: newId })); // Check if the generated ID already exists
  Id = newId;

  // Create new driver
  try {
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ error: "Driver with this email already exists" });
    }

    const newDriver = new Driver({
      fullName,
      nicNo,
      email,
      address,
      phoneNo,
      licenseType,
      Id, 
    });

    await newDriver.save();

    if (newDriver) {
      res.status(201).json({
        id: newDriver.Id,
        fullName: newDriver.fullName,
        nicNo: newDriver.nicNo,
        email: newDriver.email,
        address: newDriver.address,
        phoneNo: newDriver.phoneNo,
        licenseType: newDriver.licenseType,
        message: "New driver added successfully",
      });
    } else {
      res.status(400);
      throw new Error("Failed to add new driver");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add new driver" });
  }
});

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
};

const updateDriver = async (req, res) => {
  const driverId = req.params.Id; // Assuming the driver's generated ID is passed as a parameter
  const { fullName, nicNo, email, address, phoneNo, licenseType } = req.body;

  try {
    // Check if all required fields are present
    if (!fullName || !nicNo || !email || !address || !phoneNo || !licenseType) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Validate NIC format
    const nicRegex =/^(?:[0-9]{9}[vV]?|[0-9]{12})$/;
    if (!nicRegex.test(nicNo)) {
      return res.status(400).json({ error: "Invalid NIC number" });
    }


    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    // Find the driver by generated ID
    const driver = await Driver.findOne({Id: driverId});

    // Check if driver exists
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update driver fields
    if (fullName) driver.fullName = fullName;
    if (nicNo) driver.nicNo = nicNo;
    if (email) driver.email = email;
    if (address) driver.address = address;
    if (phoneNo) driver.phoneNo = phoneNo;
    if (licenseType) driver.licenseType = licenseType;

    // Save updated driver
    await driver.save();

    res.status(200).json({
      id: driver.Id,
      fullName: driver.fullName,
      nicNo: driver.nicNo,
      email: driver.email,
      address: driver.address,
      phoneNo: driver.phoneNo,
      licenseType: driver.licenseType,
      message: "Driver details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update driver details" });
  }
};

const deleteDriver = async (req, res) => {
  const driverId = req.params.id;
  try {
    const deletedDriver = await Driver.findOneAndDelete({ Id: driverId });
    if (!deletedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json({ status: "Driver deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete driver" });
  }
};

const getDriverById = async (req, res) => {
  const driverId = req.params.id;
  try {
    const driver = await Driver.findOne({ Id: driverId });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch driver details" });
  }
};

module.exports = {
  addDriver,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  getDriverById,
};
