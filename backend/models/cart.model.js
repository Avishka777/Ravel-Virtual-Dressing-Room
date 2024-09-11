const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const cartSchema = new Schema(
  {
    cartId: {
      type: String,
      unique: true,
    },
    
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    size: {
      type: String,
      enum: ["S", "M", "L", "XL"],
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price:{
      type: Number,
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
