const Product = require("../models/productModel.js");

const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    quantity_in_stock,
    color,
    size,
  } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    brand,
    quantity_in_stock,
    color,
    size,
  });
  try {
    await newProduct.save();
    res.json("New product added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

module.exports = {
  addProduct,
  getProductById,
};
