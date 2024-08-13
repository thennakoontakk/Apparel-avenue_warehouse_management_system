const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

// Custom validator function for NIC format
const isValidNIC = (nic) => {
    // Regular expression for validating NIC: 9 numeric digits followed by an optional 'v' or 'V' OR exactly 12 numeric digits
    const nicRegex = /^[0-9]{9}(v|V)?|[0-9]{12}$/;
    return nicRegex.test(nic);
};

const driverSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please add a full name"],
        },
        nicNo: {
            type: String,
            required: true,
            unique: true,
            validate: [isValidNIC, "Please enter a valid NIC number"], // Validate NIC format
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        address: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: [true, "Please add a Contact number"],
            minlength: [10, "please enter only 10 characters"],
            maxlength: [10, "please enter only 10 characters"],
        },
        licenseType: {
            type: String,
            enum: ["Type A", "Type B", "Type C","Type M"],
            required: true,
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

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
