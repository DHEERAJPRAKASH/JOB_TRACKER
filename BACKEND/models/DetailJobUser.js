const mongoose = require("mongoose");
const { Schema } = mongoose;

const DetailJobUserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
  },
  name: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  working: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("jobtracker", DetailJobUserSchema);
