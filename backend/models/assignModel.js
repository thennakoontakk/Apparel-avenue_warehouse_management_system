const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignSchema = new Schema(
    {
        orderID: {
            type: String,
            required: true,
            unique: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        driverID: {
            type: String,
            required: true,
        },
        driverName: {
            type: String,
            required: true,
        },
        vehicleRegNo: {
            type: String,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["processing", "delivered"],
            required: true,
        },
        dispatchDate: {
            type: Date,
            required: true,
        },
        deliveredDate: {
            type: Date,
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

const Assign = mongoose.model("Assign", assignSchema);

module.exports = Assign;
