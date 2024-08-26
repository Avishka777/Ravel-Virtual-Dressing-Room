const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const itemSchema = new Schema(
  {
    itemId: {
      type: String,
      unique: true,
    },
    itemCount: {
      type: Number,
      required: true,
      minLength: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

itemSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence("Item");
    this.itemId = `ITM${nextId}`;
  }
  next();
});

module.exports = model("Item", itemSchema);
