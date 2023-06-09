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
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Virtual to sum all group expenses

groupSchema.virtual("totalAmountPaid").get(function () {
  let total = 0;
  this.transactions.forEach((transaction) => {
    total += transaction.amountpaid;
  });
  return total.toFixed(2);
});

const Group = model("Group", groupSchema);

module.exports = Group;
