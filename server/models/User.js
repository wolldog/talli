const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import schema from Group.js
const groupSchema = require("./Group");

// found this to validate phone number, check if works (second option).
// const yourSchema = new mongoose.Schema({
//     phoneNr: {
//       type: Number
//     }
//   });

//   yourSchema.path('phoneNr').validate(function validatePhone() {
//     return ( this.phoneNr > 999999999 );
//   });

//   yourModel = mongoose.model('yourModel', yourSchema);
//   Edit:

//   const yourSchema = new mongoose.Schema({
//     phoneNr: {
//       type: String,
//       match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
//     }
//   });

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      // type string to allow phone number to start with 0. If it's a type number 0123 would be 123
      type: String,
      unique: true,
      match: [
        // check if this regex works (first option)
        /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
        "Please enter a valid phone number",
      ],
    },
    // pendent to find how to upload a picture/avatar to DB
    avatar: {
      type: String,
    },
    // set group to be an array of data that adheres to the groupSchema
    group: [groupSchema],

    friends: {
      // username or user_id
      type: String,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};



const User = model("User", userSchema);

module.exports = User;
