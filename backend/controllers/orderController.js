const Order = require("../models/orderModel");

const addOrder = async (req, res) => {
  const { address, city, phoneNumber, paymentMethod, slip } = req.body;

  //const { _id: orderby } = req.user;

  const newOrder = new Order({
    address,
    city,
    phoneNumber,
    paymentMethod,
    slip,
    //orderby,
  });
  try {
    const savedOrder = await newOrder.save();
    res.json(savedOrder); // Send the saved order object as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.json({ status: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getAllOrders,
  deleteOrder,
};
