const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
  },
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "pink",
  },
});

module.exports = mongoose.model("notes", NotesSchema);
