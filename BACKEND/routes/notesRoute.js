const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const NotesUser = require("../models/Notes");

//ROUTE 1 - Notes for user : GET "/api/jobtracker/notes"
router.get("/notes", fetchuser, async (req, res) => {
  try {
    const detailuser = await NotesUser.find({ user: req.user.id });
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 - Notes for user : POST "/api/jobtracker/notes/:id
router.post("/addNotes", fetchuser, async (req, res) => {
  const { title, descriptions, color } = req.body;
  const userdet = new NotesUser({
    user: req.user.id,
    title,
    descriptions,
    color,
  });
  const savedPost = await userdet.save();
  res.json(savedPost);
});

//ROUTE 3 - Notes for user : PUT "/api/jobtracker/updateNote/:id"
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const { title, descriptions, color } = req.body;
  try {
    //Create a newUser object
    const newNote = {};
    //validate and check which field is available and update accordingly
    if (title) {
      newNote.title = title;
    }
    if (descriptions) {
      newNote.descriptions = descriptions;
    }
    if (color) {
      newNote.color = color;
    }
    let noteupdate = await NotesUser.findById(req.params.id);
    if (!noteupdate) {
      return req.status(404).send("Not Found");
    }
    if (noteupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    noteupdate = await NotesUser.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ noteupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 - DELETE Notes for user : DELETE "/api/jobtracker/deleteNote/:id"
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await NotesUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await NotesUser.findByIdAndDelete(req.params.id);
    res.json({
      Success: "User Details has been deleted",
      userupdate: userupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
