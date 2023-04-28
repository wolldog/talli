const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
    {
groupname:{
    type: String,
    require: true,
    unique: true,
},
members:{
    // username or user_id
    type:String,
}
}
);

// update to member count
// // when we query a group, we'll also get another field called `groupCount` with the number of users that joined the group
// groupSchema.virtual("groupCount").get(function () {
//   return this.members.length;
// });

const Group = model("Group", groupSchema);

module.exports = Group;
