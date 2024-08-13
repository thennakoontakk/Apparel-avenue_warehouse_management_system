const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const orderSchema = new Schema(
  {
    address: String,
    city: String,
    phoneNumber: String,
    paymentMethod: String,
    slip: [
      {
        public_id: String,
        url: String,
      },
    ],

    /*orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },*/
  },

  {
    timestamps: true,
  }
);

//Export the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
