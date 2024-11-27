const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://SDP_DB:221025@cluster0.5prhg.mongodb.net/jobtracker?authSource=admin&replicaSet=atlas-2z9kzb-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
