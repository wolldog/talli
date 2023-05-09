const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const groupSchema = new Schema(
  {
    // admin=userId
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    transactions: [
      {
        transactionname: {
          type: String,
        },
        description: {
          type: String,
          max_length: 100,
        },
        payer: {
          // user is creating the transaction
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        amountpaid: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now(),
          get: (timestamp) => dateFormat(timestamp),
        },
        attachment: {
          type: String,
        },
      },
    ],
    // membersPayments
    groupexpenses: [
      {
        type: Number,
      },
    ],
    groupcredit: [
      {
        type: Number,
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a group, we'll also get another field called `totalgroupexpenses` with the total expense of the group
groupSchema.virtual("totalgroupexpenses").get(function () {
  let expenses = this.groupexpenses;
  let expensesSum = 0;
  for (let i = 0; i < expenses.length; i++) {
    expensesSum += expenses[i];
  }
  console.log(expensesSum);
  return expensesSum;
});

const Group = model("Group", groupSchema);

module.exports = Group;
