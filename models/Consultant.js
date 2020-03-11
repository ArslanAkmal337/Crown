const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  image:{
    type:String
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  gender: {
    type: String
  },
  qualification: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("consultant", UserSchema);
