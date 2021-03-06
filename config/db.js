const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectdb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

module.exports = connectdb;
