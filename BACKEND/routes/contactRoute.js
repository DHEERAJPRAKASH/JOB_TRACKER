const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const ContactJobUser = require("../models/Contact");
const { body, validationResult } = require("express-validator");


router.get("/getContacts", fetchuser, async (req, res) => {
    try {
      const detailuser = await ContactJobUser.find({ user: req.user.id });
      res.json([detailuser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  //ROUTE 16 - ADD CONTACTS
  router.post(
    "/addContact",
    fetchuser,
    [
      body("name", "Enter a valid Name").isLength({ min: 3 }),
    ],
    async (req, res) => {
      try {
        const {
          name,
          designation,
          location,
          phoneno,
          email,
          linkedin,
          github,
          portfolio,
        } = req.body;
  
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const userdet = new ContactJobUser({
          user: req.user.id,
          name,
          designation,
          location,
          phoneno,
          email,
          linkedin,
          github,
          portfolio,
        });
  
        const saveduser = await userdet.save();
  
        res.json([saveduser]);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  //ROUTE 17 - UPDATE CONTACTS
  router.put("/updateContact/:id", fetchuser, async (req, res) => {
    const {
      name,
      designation,
      location,
      phoneno,
      email,
      linkedin,
      github,
      portfolio,
    } = req.body;

    try {
      //Create a newUser object
      const newApplication = {};
      //validate and check which field is available and update accordingly
      if (name) {
        newApplication.name = name;
      }
      if (designation) {
        newApplication.designation = designation;
      }
      if (location) {
        newApplication.location = location;
      }
      if (phoneno) {
        newApplication.phoneno = phoneno;
      }
      if (email) {
        newApplication.email = email;
      }
      if (linkedin) {
        newApplication.linkedin = linkedin;
      }
      if (github) {
        newApplication.github = github;
      }
      if (portfolio) {
        newApplication.portfolio = portfolio;
      }
  
      //Find the userdetail to be updated and update it
      //Always validate the user and update which is done below
      let applicationupdate = await ContactJobUser.findById(req.params.id);

      if (!applicationupdate) {
        return req.status(404).send("Not Found");
      }
      if (applicationupdate.user.toString() !== req.user.id) {
        return req.status(401).send("Not Allowed");
      }
  

  
      applicationupdate = await ContactJobUser.findByIdAndUpdate(
        req.params.id,
        { $set: newApplication },
        { new: true }
      );
      res.json({ applicationupdate });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  //ROUTE 18 - DELETE CONTACTS
  router.delete("/deleteContact/:id", fetchuser, async (req, res) => {
    try {
      let userupdate = await ContactJobUser.findById(req.params.id);
      if (!userupdate) {
        return req.status(404).send("Not Found");
      }
  
      if (userupdate.user.toString() !== req.user.id) {
        return req.status(401).send("Not Allowed");
      }
  
      userupdate = await ContactJobUser.findByIdAndDelete(req.params.id);
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