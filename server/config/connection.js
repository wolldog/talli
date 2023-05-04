require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
mongoose.connect(
  // process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/talliDB",
  `mongodb+srv://pia:pia123@piaf.jtkrmeu.mongodb.net/talliDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
