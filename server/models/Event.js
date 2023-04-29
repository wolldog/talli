const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
  expenses: [expenseSchema],
  balance: {
    type: Number,
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
