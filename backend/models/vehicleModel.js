const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Custom validator function for NIC format
const isValidNIC = (nic) => {
  // Regular expression for validating NIC: 9 numeric digits followed by an optional 'v' or 'V' OR exactly 12 numeric digits
  const nicRegex = /^[0-9]{9}(v|V)?|[0-9]{12}$/;
  return nicRegex.test(nic);
};

// Custom validator function for vehicle registration number format in Sri Lanka
const isValidRegistrationNumber = (registrationNumber) => {
  // Regular expression for validating vehicle registration number:
  // AAA 0001 or AA 0001 or AB 1234 or any combination of two or three uppercase English letters followed by a space and then four digits
  const regNumberPattern = /^[A-Z]{2,3}\s\d{4}$/;
  return regNumberPattern.test(registrationNumber);
};

// Custom validator function for capacity field to ensure it's not negative
const isPositiveCapacity = (capacity) => {
  return capacity >= 0;
};

const vehicleSchema = new Schema(
  {
    ownerName: {
      type: String,
      required: [true, "Please add a full name"],
    },
    ownerNIC: {
      type: String,
      required: true,
      unique: true,
      validate: [isValidNIC, "Please enter a valid NIC number"], // Validate NIC format
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    ownerContactNo: {
      type: Number,
      required: [true, "Please add a Contact number"],
      minlength: [10, "Phone number must be 10 characters long"],
      maxlength: [10, "Phone number must be 10 characters long"],
    },
    registrationNumber: {
      type: String,
      required: true,
      validate: [isValidRegistrationNumber, "Please enter a valid vehicle registration number in the format 'AAA 1234' or 'AA 1234'"],
    },
    model: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      validate: [isPositiveCapacity, "Capacity must be a positive number"],
    },
    Id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
