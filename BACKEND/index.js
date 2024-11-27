const connectToMongo = require("./db");

const express = require("express");
const app = express();
const port = 5000;

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var fs = require("fs");
var path = require("path");
var cors = require("cors");

require("dotenv/config");
app.use(cors());
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobtracker", require("./routes/jobUserRoute"));
app.use("/api/jobtracker", require("./routes/notesRoute"));
app.use("/api/jobtracker", require("./routes/contactRoute"));
app.use("/api/jobtracker", require("./routes/jobApplicationRoute"));

app.listen(port, () => {
  console.log(`JOB TRACKER BACKEND app listening at http://localhost:${port}`);
});

connectToMongo();
