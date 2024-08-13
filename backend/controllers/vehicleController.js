const Vehicle = require("../models/vehicleModel.js");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
require("dotenv").config();

const addVehicle = expressAsyncHandler(async (req, res) => {
  const { ownerName, ownerNIC, ownerAddress, ownerContactNo, registrationNumber, model, capacity } = req.body;

  // Validation
  if (!ownerName || !ownerNIC || !ownerAddress || !ownerContactNo || !registrationNumber || !model || !capacity) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Validate owner NIC format
  const nicRegex = /^[0-9]{9}(vV)?|[0-9]{12}$/;
  if (!nicRegex.test(ownerNIC)) {
    res.status(400);
    throw new Error("Invalid NIC number");
    
  }

  // Validate registration number format
  const regNumberPattern = /^[A-Z]{2,3}\s\d{4}$/;
  if (!regNumberPattern.test(registrationNumber)) {
    res.status(400);
    throw new Error("Invalid registration number");
    
  }
  // Ensure capacity is not negative
  if (capacity < 0) {
    res.status(400);
    throw new Error("Capacity cannot be a negative value");
  }

  let Id;

  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "VE" + randomNum.toString();
  } while (await Vehicle.findOne({ id: newId })); // Check if the generated ID already exists

  Id = newId;

  try {
    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({ error: "Vehicle with this registration number already exists" });
    }

    const newVehicle = new Vehicle({
      ownerName,
      ownerNIC,
      ownerAddress,
      ownerContactNo,
      registrationNumber,
      model,
      capacity,
      Id,// Add the generated ID here
    });
  
    await newVehicle.save();
  
    if (newVehicle) {
      res.status(201).json({
        id: newVehicle.Id, // Use 'id' instead of 'Id'
        ownerName: newVehicle.ownerName,
        ownerNIC: newVehicle.ownerNIC,
        ownerAddress: newVehicle.ownerAddress,
        ownerContactNo: newVehicle.ownerContactNo,
        registrationNumber: newVehicle.registrationNumber,
        model: newVehicle.model,
        capacity: newVehicle.capacity,
        message: "New vehicle added successfully",
      });
    } else {
      res.status(400);
      throw new Error("Failed to add new vehicle");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add new vehicle" });
  }
});

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

const updateVehicle = async (req, res) => {
  const vehicleId = req.params.Id; // Assuming the vehicle's generated ID is passed as a parameter
  const { ownerName, ownerNIC, ownerAddress, ownerContactNo, registrationNumber, model, capacity } = req.body;

  try {
    // Check if all required fields are present
    if (!ownerName || !ownerNIC || !ownerAddress || !ownerContactNo || !registrationNumber || !model || !capacity) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Validate owner NIC format
    const nicRegex = /^[0-9]{9}(vV)?|[0-9]{12}$/;
    if (!nicRegex.test(ownerNIC)) {
      return res.status(400).json({ error: "Invalid NIC number" });
    }

    // Validate registration number format
    const regNumberPattern = /^[A-Z]{2,3}\s\d{4}$/;
    if (!regNumberPattern.test(registrationNumber)) {
      return res.status(400).json({ error: "Invalid registration number" });
    }
    // Ensure capacity is not negative
    if (capacity < 0) {
      res.status(400);
      throw new Error("Capacity cannot be a negative value");
    }

    // Find the vehicle by generated ID
    const vehicle = await Vehicle.findOne({Id: vehicleId});

    // Check if vehicle exists
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Update vehicle fields
    if (ownerName) vehicle.ownerName = ownerName;
    if (ownerNIC) vehicle.ownerNIC = ownerNIC;
    if (ownerAddress) vehicle.ownerAddress = ownerAddress;
    if (ownerContactNo) vehicle.ownerContactNo = ownerContactNo;
    if (registrationNumber) vehicle.registrationNumber = registrationNumber;
    if (model) vehicle.model = model;
    if (capacity) vehicle.capacity = capacity;

    // Save updated vehicle
    await vehicle.save();

    res.status(200).json({
      id: vehicle.Id, // Use 'id' instead of 'Id'
      ownerName: vehicle.ownerName,
      ownerNIC: vehicle.ownerNIC,
      ownerAddress: vehicle.ownerAddress,
      ownerContactNo: vehicle.ownerContactNo,
      registrationNumber: vehicle.registrationNumber,
      model: vehicle.model,
      capacity: vehicle.capacity,
      message: "Vehicle details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update vehicle details" });
  }
};

const deleteVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const deletedVehicle = await Vehicle.findOneAndDelete({ Id: vehicleId });
    if (!deletedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json({ status: "Vehicle deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
};

const getVehicleById = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const vehicle = await Vehicle.findOne({ Id: vehicleId });
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch vehicle details" });
  }
};

module.exports = {
  addVehicle,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
};
