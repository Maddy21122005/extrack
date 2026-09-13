const Transaction = require("../models/transaction");
const moment = require("moment");
const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, reference, description, date } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      reference,
      description,
      date,
      user: req.user._id,
    });

    res.status(201).send("Transaction Success");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const {
      dateType, // today | week | month | year | all
      type,
      category,
      minAmount,
      maxAmount,
    } = req.query;

    let filter = { user: req.user._id };

    // -------- DATE FILTER --------
    if (dateType === "today") {
      filter.date = { $gte: moment().startOf("day").toDate() };
    }

    if (dateType === "week") {
      filter.date = { $gte: moment().subtract(7, "days").toDate() };
    }

    if (dateType === "month") {
      filter.date = { $gte: moment().subtract(1, "month").toDate() };
    }

    if (dateType === "year") {
      filter.date = { $gte: moment().subtract(1, "year").toDate() };
    }
    if (dateType === "custom" && req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    // -------- TYPE FILTER --------
    if (type) {
      filter.type = type;
    }

    // -------- CATEGORY FILTER --------
    if (category) {
      filter.category = category;
    }

    // -------- AMOUNT FILTER --------
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).send(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { amount, type, category, reference, description, date } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        amount,
        type,
        category,
        reference,
        description,
        date,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Edit Successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  addTransaction,
  deleteTransaction,
  getAllTransaction,
  editTransaction,
};
