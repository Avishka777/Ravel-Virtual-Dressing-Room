const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const cartSchema = new Schema(
  {
    cartId: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Recieved", "Processing", "Completed"],
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence("Cart");
    this.cartId = `CART${nextId}`;
  }
  next();
});

module.exports = model("Cart", cartSchema);
