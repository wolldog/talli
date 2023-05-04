const { Schema, model } = require("mongoose");

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
    type: Number,
  },
  payer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  attachment: {
    type: String,
  },
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
