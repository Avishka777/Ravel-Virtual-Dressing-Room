const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const counterSchema = new Schema({
  _id: { type: String, required: true }, // Collection name for which the counter is maintained
  seq: { type: Number, default: 0 }, // Last used ID
});

const Counter = model("counter", counterSchema);

module.exports = Counter;
