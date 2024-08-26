const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            unique: true,
        },
        itemCount: {
            type: Number,
            required: true,
            minLength: 1,
        },
        totalAmount: {
            type: Number,
            required: true,
            minLength: 1,
        },
        status: {
            type: String,
            required: true,
            enum: ["Recieved", "Processing", "Completed"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },
    },
    { timestamps: true }
);

orderSchema.pre("save", async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence("Order");
        this.orderId = `ORD${nextId}`;
    }
    next();
});

module.exports = model("Order", orderSchema);
