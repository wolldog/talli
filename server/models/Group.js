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
});

const groupSchema = new Schema(
  {
    admin: {
      type: String,
      require: true,
    },
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
    balance: {
      type: Number,
    },
    expenses: [expenseSchema],
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
