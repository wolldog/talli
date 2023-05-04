const { Schema, model } = require("mongoose");

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
    expenses: [{
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },],
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