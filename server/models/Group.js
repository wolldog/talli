const { Schema, model } = require("mongoose");

// import schema from Expense.js
const expenseSchema = require("./Expense");

const groupSchema = new Schema(
  {
    groupname: {
      type: String,
      require: true,
      unique: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // array that will holds all the expenses
    events: [eventSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a group, we'll also get another field called `membersCount` with the number of users that joined the group
groupSchema.virtual("membersCount").get(function () {
  return this.members.length;
});

const Group = model("Group", groupSchema);

module.exports = Group;
