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
    groupdebit: {
      type: Number,
    },
    groupcredit: {
      type: Number,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a group, we'll also get another field called `membersCount` with the number of users that joined the group
// groupSchema.virtual("membersCount").get(function () {
//   return this.members.length;
// });

const Group = model("Group", groupSchema);

module.exports = Group;
