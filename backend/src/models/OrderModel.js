const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not process",
      enum: ["Not process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("orders", OrderSchema)
