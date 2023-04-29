const { Schema, model } = require("mongoose");

// import schema from Expense.js
const expenseSchema = require("./Expense");

const eventSchema = new Schema({
  groupname: {
    // group name from group schema
    type: String,
  },
  expense: {
    type: [expenseSchema],
  },
});
