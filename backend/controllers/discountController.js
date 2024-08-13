// discountController.js
const Discount = require("../models/discountModel.js");

const addDiscount = async (req, res) => {
  const { code, expiry, percentage } = req.body;

  //Validation
  if (!code || !expiry || !percentage) {
    res.status(500);
    throw new Error("Please include all fields");
  }

  // Check if the expiry date is in the future
  if (expiry <= new Date()) {
    return res.status(400).json({ error: "Expiry date must be a future date" });
  }

  // Check if the percentage is negative or greater than 100
  if (percentage < 0 || percentage > 100) {
    return res.status(400).json({
      error: "Percentage must be a non-negative value less than 100",
    });
  }

  const newDiscount = new Discount({
    code,
    expiry,
    percentage,
  });
  try {
    await newDiscount.save();
    res.json("New discount added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add discount" });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch discounts" });
  }
};

const updateDiscount = async (req, res) => {
  const { id } = req.params;
  const { code, expiry, percentage } = req.body;
  try {
    //Validation
    if (!code || !expiry || !percentage) {
      res.status(500);
      throw new Error("Please include all fields");
    }

    // Check if the expiry date is in the future
    if (expiry <= new Date()) {
      return res
        .status(400)
        .json({ error: "Expiry date must be after the current date" });
    }

    // Check if the percentage is negative or greater than 100
    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        error: "Percentage must be a non-negative value less than 100",
      });
    }

    await Discount.findByIdAndUpdate(id, {
      code,
      expiry,
      percentage,
    });
    res.json({ status: "Discount updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update discount" });
  }
};

const deleteDiscount = async (req, res) => {
  const { id } = req.params;
  try {
    await Discount.findByIdAndDelete(id);
    res.json({ status: "Discount deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete discount" });
  }
};

const getDiscountById = async (req, res) => {
  const { id } = req.params;
  try {
    const discount = await Discount.findById(id);
    if (!discount) {
      return res.status(404).json({ error: "Discount not found" });
    }
    res.json(discount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch discount" });
  }
};

module.exports = {
  addDiscount,
  getAllDiscounts,
  updateDiscount,
  deleteDiscount,
  getDiscountById,
};
