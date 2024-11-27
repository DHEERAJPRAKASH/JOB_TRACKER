const mongoose = require("mongoose");
const { Schema } = mongoose;

const DetailJobUserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
  },
  name: {
    type: String,
  },
  mobileno: {
    type: String,
  },
  designation: {
    type: String,
  },
  email:{
    type: String,
  },
  working: {
    type: String,
  },
  about: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("jobtracker", DetailJobUserSchema);
