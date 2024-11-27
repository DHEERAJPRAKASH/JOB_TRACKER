const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationJobUserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
  },
  company: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  usernameUsed: {
    type: String,
  },
  pwdUsed: {
    type: String,
  },
  urlUsed: {
    type: String,
  },
  deadLine: {
    type: String,
  },
  interviewDate: {
    type: String,
  },
  category: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("application", ApplicationJobUserSchema);
