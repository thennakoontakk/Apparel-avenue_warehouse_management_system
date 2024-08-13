//supplierOrderController.js

const Supplierorder = require("../models/supplierOrderModel.js");


const addSupplierOrder = async (req, res) => {
  const { supplierOrderStatus, ItemID, supplierID, Quantity, itemPerPrice, description } = req.body;

  // Validation: Check if any required fields are missing
  if (!supplierOrderStatus || !ItemID || !supplierID || !Quantity || !itemPerPrice || !description) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Validation: Quantity should not be less than 0
  if (Quantity < 0) {
    return res.status(400).json({ error: "Quantity should not be less than 0" });
  }

  // Validation: Price should not be less than 0
  if (itemPerPrice < 0) {
    return res.status(400).json({ error: "Price should not be less than 0" });
  }

  // Validation: Price should not be greater than 30,000
  if (itemPerPrice > 30000) {
    return res.status(400).json({ error: "Price should not be greater than 30,000" });
  }

  try {
    let supplierOrdernewID;
    do {
      // Generate a random four-digit number
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      supplierOrdernewID = "SO" + randomNum.toString();
    } while (await Supplierorder.findOne({ id: supplierOrdernewID })); // Check if the generated ID already exists

    const newOrder = new Supplierorder({
      supplierOrderID: supplierOrdernewID,
      supplierOrderStatus,
      ItemID,
      supplierID,
      Quantity,
      itemPerPrice,
      description,
    });

    await newOrder.save();
    res.json("New Order added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add Order" });
  }
};



const getAllSupplierOrder = async (req, res) => {
  try {
    const orders = await Supplierorder.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Orders" });
  }
};

const updateSupplierOrder = async (req, res) => {
  const { supplierOrderID } = req.params.id;
  const { supplierOrderStatus, ItemID, supplierID, itemPerPrice, description, Quantity } = req.body;

  // Validation: Check if any required fields are missing
  if (!supplierOrderStatus || !ItemID || !supplierID || !itemPerPrice || !description || !Quantity) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Validation: Quantity should not be less than 0
  if (Quantity < 0) {
    return res.status(400).json({ error: "Quantity should not be less than 0" });
  }

  // Validation: Price should not be less than 0
  if (itemPerPrice < 0) {
    return res.status(400).json({ error: "Price should not be less than 0" });
  }

  try {
    // Find the supplier order by ID and update its details
    await Supplierorder.findOneAndUpdate(supplierOrderID, {
      supplierOrderStatus,
      ItemID,
      supplierID,
      itemPerPrice,
      Quantity,
      description,
    });
    res.json({ status: "Supplier Order updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update Supplier Order" });
  }
};


const deleteSupplierOrder = async (req, res) => {
    const { supplierOrderID } = req.params;
    try {
      await Supplierorder.findOneAndDelete(supplierOrderID);
      res.json({ status: "order deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete order" });
    }
  };

  const getSupplierOrderById = async (req, res) => {
    const { supplierOrderID } = req.params;
    try {
      const order = await Supplierorder.findOne(supplierOrderID);
      if (!order) {
        return res.status(404).json({ error: " order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  };

module.exports = {
  addSupplierOrder,
  updateSupplierOrder,
  getAllSupplierOrder,
  deleteSupplierOrder,
  getSupplierOrderById,

  
};
