const { Schema, model } = require("mongoose");

// import schema from Category.js
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
  // category: {
  //   type: String,
  //   enum: ["food", "transport", "acomodation", "enterteiment", "other"],
  // },
  amount: {
    type: Float,
  },
  payer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
