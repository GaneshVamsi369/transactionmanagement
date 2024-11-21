const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// POST /api/transactions/ - Create a new transaction
router.post("/", async (req, res) => {
  try {
    const { amount, transaction_type, user } = req.body;

    const newTransaction = new Transaction({
      amount,
      transaction_type,
      user,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/transactions/ - Get all transactions for a specific user
router.get("/", async (req, res) => {
  const { user_id } = req.query;

  try {
    const transactions = await Transaction.find({ user: user_id });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/transactions/:transaction_id - Get transaction by ID
router.get("/:transaction_id", async (req, res) => {
  const { transaction_id } = req.params;

  try {
    const transaction = await Transaction.findById(transaction_id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/transactions/:transaction_id - Update transaction status
router.put("/:transaction_id", async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ["COMPLETED", "FAILED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
