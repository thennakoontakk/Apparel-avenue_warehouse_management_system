// managerController.js
const Manager = require("../models/managerModel.js");

const addManager = async (req, res) => {
  const { managerID, managerType, fullName, email, phone, username, password } =
    req.body;
  const newManager = new Manager({
    managerID,
    managerType,
    fullName,
    email,
    phone,
    username,
    password,
  });
  try {
    await newManager.save();
    res.json("New manager added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add manager" });
  }
};

const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch managers" });
  }
};

const updateManager = async (req, res) => {
  const { id } = req.params;
  const { managerID, managerType, fullName, email, phone, username, password } =
    req.body;
  try {
    await Manager.findByIdAndUpdate(id, {
      managerID,
      managerType,
      fullName,
      email,
      phone,
      username,
      password,
    });
    res.json({ status: "Manager updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update manager" });
  }
};

const deleteManager = async (req, res) => {
  const { id } = req.params;
  try {
    await Manager.findByIdAndDelete(id);
    res.json({ status: "Manager deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete manager" });
  }
};

const getManagerById = async (req, res) => {
  const { id } = req.params;
  try {
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }
    res.json(manager);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch manager" });
  }
};

module.exports = {
  addManager,
  getAllManagers,
  updateManager,
  deleteManager,
  getManagerById,
};
