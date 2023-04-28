const { Schema, model } = require("mongoose");
const categorySchema = require("./Category");

const expenseSchema = new Schema({
  expensename: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    max_length: 100,
  },
  category: {
    type: [categorySchema],
  },
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
