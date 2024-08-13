// supplierController.js
const Supplier = require("../models/supplierModel.js");
const validator = require("validator");


const addSupplier = async (req, res) => {
  const {  supplierType, fullName, garmentName,address,email, phone,description } =
    req.body;
   
    //Validation
  if ( !supplierType|| !fullName||  !garmentName||!address|| !email||!phone|| !description) {
    res.status(400);
    throw new Error("Please include all fields");
  }
 //check whether the email is a valid one
 if (!validator.isEmail(email)) {
  res.status(400);
  throw new Error("Email is not valid");
}

  // Check if Phone  is 10 digits long
  if (!validator.isLength(phone, { min: 10, max: 10 })) {
    return res
      .status(400)
      .json({ error: "Phone Number must be 10 digits long" });
  }



  

let supplierID;

  let suppliernewID;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    suppliernewID = "SP" + randomNum.toString();
  } while (await Supplier.findOne({ id: suppliernewID })); // Check if the generated ID already exists

 supplierID = suppliernewID;
    
const newSupplier = new Supplier({
    supplierID,
    supplierType,
    fullName,
    garmentName,
    address,
    email,
    phone,
    description,
    
  });
  try {
    await newSupplier.save();
    res.json("New Supplier added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add Supplier" });
  }
};
   
const getAllSupplier = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
};

const updateSupplier = async (req, res) => {
  const { supplierID } = req.params;
  const {  supplierType, fullName,garmentName,address, email, phone,description} =
    req.body;
  try {
    await Supplier.findOneAndUpdate(supplierID, {
     
      supplierType,
      fullName,
      garmentName,
      address,
      email,
      phone,
      description,
    });
    res.json({ status: "Supplier  updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update supplier" });
  }
};

const deleteSupplier = async (req, res) => {
  const { supplierID } = req.params;
  try {
    await Supplier.findOneAndDelete(supplierID);
    res.json({ status: "Suppplier deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Supplier" });
  }
};

const getSupplierById = async (req, res) => {
  const { supplierID } = req.params;
  try {
    const supplier = await Supplier.findOne(supplierID );
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch supplier" });
  }
};

module.exports = {
  addSupplier,
  getAllSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
};
