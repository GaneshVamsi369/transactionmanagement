const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["DEPOSIT", "WITHDRAWAL"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming a User model exists
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED"],
    default: "PENDING",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
