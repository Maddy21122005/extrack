const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is Required"],
    },
    type: {
      type: String,
      required: [true, "Type is Required"],
    },
    category: {
      type: String,
      required: [true, "Category is Required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  },
  { timestamps: true },
);

const Transaction  = model('transaction', transactionSchema);

module.exports = Transaction
