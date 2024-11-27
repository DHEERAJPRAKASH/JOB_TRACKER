const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactJobUserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
  },
  location: {
    type: String,
  },
  phoneno: {
    type: String,
  },
  email: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  portfolio: {
    type: String,
  },
});

module.exports = mongoose.model("contact", ContactJobUserSchema);
