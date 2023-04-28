const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  transport: {
    type: Stringh,
  },
  food: {
    type: Stringh,
  },
  acomodation: {
    type: Stringh,
  },
  entertaiment: {
    type: Stringh,
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
