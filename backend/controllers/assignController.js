const Assign = require("../models/assignModel.js");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
require("dotenv").config();

const addAssignment = expressAsyncHandler(async (req, res) => {
  const {
    orderID,
    customerName,
    address,
    driverID,
    driverName,
    vehicleRegNo,
    orderStatus,
    dispatchDate,
    deliveredDate
  } = req.body;

  try {
    // Check if all required fields are present
    if (!orderID || !customerName || !address || !driverID || !driverName || !vehicleRegNo || !orderStatus || !dispatchDate || !deliveredDate) {
      return res.status(400).json({ error: "Please include all fields" });
    }
 

    // Generate a unique ID for the assignment
    let Id;
    let newId;
    do {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      newId = "AS" + randomNum.toString();
    } while (await Assign.findOne({ id: newId })); // Check if the generated ID already exists
    Id = newId;

    // Create new assignment
    const newAssignment = new Assign({
      orderID,
      customerName,
      address,
      driverID,
      driverName,
      vehicleRegNo,
      orderStatus,
      dispatchDate,
      deliveredDate,
      Id,
    });

    await newAssignment.save();

    if (newAssignment) {
      res.status(201).json({
        id: newAssignment.Id,
        orderID: newAssignment.orderID,
        customerName: newAssignment.customerName,
        address: newAssignment.address,
        driverID: newAssignment.driverID,
        driverName: newAssignment.driverName,
        vehicleRegNo: newAssignment.vehicleRegNo,
        orderStatus: newAssignment.orderStatus,
        dispatchDate: newAssignment.dispatchDate,
        deliveredDate: newAssignment.deliveredDate,
        message: "New assignment added successfully",
      });
    } else {
      res.status(400);
      throw new Error("Failed to add new assignment");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add new assignment" });
  }
});



const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assign.find();
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

const updateAssignment = async (req, res) => {
  const assignmentId = req.params.Id;
  const {
    orderID,
    customerName,
    address,
    driverID,
    driverName,
    vehicleRegNo,
    orderStatus,
    dispatchDate,
    deliveredDate
  } = req.body;

  try {
    // Check if all required fields are present
    if (!orderID || !customerName || !address || !driverID || !driverName || !vehicleRegNo || !orderStatus || !dispatchDate || !deliveredDate) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    const assignment = await Assign.findOne({Id: assignmentId});

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    if(orderID)assignment.orderID = orderID;
    if(customerName)assignment.customerName = customerName;
    if(address)assignment.address = address;
    if(driverID)assignment.driverID = driverID;
    if(driverName)assignment.driverName = driverName;
    if(vehicleRegNo)assignment.vehicleRegNo = vehicleRegNo;
    if(orderStatus)assignment.orderStatus = orderStatus;
    if(dispatchDate)assignment.dispatchDate = dispatchDate;
    if(deliveredDate)assignment.deliveredDate = deliveredDate;

    // Save updated assign
    await assignment.save();

    res.status(200).json({
      id: assignment.Id,
      orderID: assignment.orderID,
      customerName: assignment.customerName,
      address: assignment.address,
      driverID: assignment.driverID,
      driverName: assignment.driverName,
      vehicleRegNo: assignment.vehicleRegNo,
      orderStatus: assignment.orderStatus,
      dispatchDate: assignment.dispatchDate,
      deliveredDate: assignment.deliveredDate,
      message: "Assignment details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update assignment details" });
  }
};

const deleteAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    const deletedAssignment = await Assign.findOneAndDelete({Id: assignmentId});
    if (!deletedAssignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.status(200).json({ status: "Assignment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};


const getAssignmentById = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    const assignment = await Assign.findOne({Id: assignmentId});
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch assignment details" });
  }
};

module.exports = {
  addAssignment,
  getAllAssignments,
  updateAssignment,
  deleteAssignment,
  getAssignmentById,
};
