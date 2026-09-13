const { Router } = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction
} = require("../controllers/transaction");

const router = Router();

//Routes
router.post("/add-transaction", addTransaction);

router.put("/edit-transaction/:id", editTransaction);

router.delete('/delete-transaction/:id', deleteTransaction)

router.get("/all-transaction", getAllTransaction);

module.exports = router;
