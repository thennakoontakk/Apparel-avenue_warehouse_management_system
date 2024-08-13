const Complaint = require("../models/complaintModel.js");
const expressAsyncHandler = require("express-async-handler");

const addComplaint = expressAsyncHandler(async (req, res) => {
  const {
    date,
    orderID,
    customerID,
    contact_no,
    complaintType,
    requestType,
    description,
  } = req.body;

  // Validation
  if (!date || !orderID || !customerID || !contact_no || !complaintType) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }
  

  // Generating complaintID
  let complaintID;

  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    complaintID = "CI" + randomNum.toString();
  } while (await Complaint.findOne({ complaintID: complaintID }));

  try {
    const existingComplaint = await Complaint.findOne({ complaintID });
    if (existingComplaint) {
      return res.status(400).json({ error: "complaintID already exists" });
    }

    const newComplaint = new Complaint({
      complaintID,
      date,
      orderID,
      customerID,
      contact_no,
      complaintType,
      description,
      requestType,
    });
    await newComplaint.save();

    if (newComplaint) {
      res.status(201).json({
        complaintID: newComplaint.complaintID,
        date: newComplaint.date,
        orderID: newComplaint.orderID,
        customerID: newComplaint.customerID,
        contact_no: newComplaint.contact_no,
        complaintType: newComplaint.complaintType,
        requestType: newComplaint.requestType,
        description: newComplaint.description,

        message: "Complaint submitted successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add complaint" });
  }
});

const updateComplaint = async (req, res) => {
  const complaintID = req.params.complaintID;
  const {
    date,
    orderID,
    customerID,
    contact_no,
    complaintType,
    requestType,
    description,
  } = req.body;
  try {
    // Validation
    if (
      !date ||
      !orderID ||
      !customerID ||
      !contact_no ||
      !complaintType ||
      !requestType ||
      !description
    ) {
      res.status(400);
      throw new Error("Please include all mandatory fields");
    }

    const complaint = await Complaint.findOne({ complaintID: complaintID });

    if (!complaint) {
      return res.status(404).json({ error: "complaint not found" });
    }

    if (date) complaint.date = date;
    if (orderID) complaint.orderID = orderID;
    if (customerID) complaint.customerID = customerID;
    if (contact_no) complaint.contact_no = contact_no;
    if (complaintType) complaint.complaintType = complaintType;
    if (requestType) complaint.requestType = requestType;
    if (description) complaint.description = description;

    await complaint.save();

    res.status(200).json({
      complaintID: complaint.complaintID,
      date: complaint.date,
      orderID: complaint.orderID,
      customerID: complaint.customerID,
      contact_no: complaint.contact_no,
      complaintType: complaint.complaintType,
      requestType: complaint.requestType,
      description: complaint.description,
      message: "Complaint details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update complaint" });
  }
};

// Manager actions
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

const deleteComplaint = async (req, res) => {
  const complaintID = req.params.complaintID;

  try {
    const deletedComplaint = await Complaint.findOneAndDelete({
      complaintID: complaintID,
    });

    if (!deletedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete complaint" });
  }
};

const getComplaintById = async (req, res) => {
  const { complaintID } = req.params;

  try {
    const complaint = await Complaint.findOne({ complaintID: complaintID });
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch complaint" });
  }
};

const updateStatus = async (req, res) => {
  const { complaintID } = req.params;
  const { status } = req.body;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintID,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    return res.json(updatedComplaint);
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Failed to update complaint status" });
  }
};

module.exports = {
  addComplaint,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  getComplaintById,
  updateStatus,
};
