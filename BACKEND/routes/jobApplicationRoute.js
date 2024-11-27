const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const ApplicationJobUser = require("../models/Applications");


//ROUTE 1 - GET JOB APPLICATION DETAILS "/api/jobtracker/getApplication"
router.get("/getApplication", fetchuser, async (req, res) => {
  try {
    const detailuser = await ApplicationJobUser.find({ user: req.user.id });
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//ROUTE 2 - ADD JOB APPLICATION "/api/jobtracker/addApplication"
router.post(
  "/addApplication",
  fetchuser,
  [
    body("company", "Enter a valid Company Name").isLength({ min: 3 }),
    body("title", "Enter a valid Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const {
        company,
        salary,
        title,
        description,
        usernameUsed,
        pwdUsed,
        deadLine,
        interviewDate,
        category,
        location,
        urlUsed,
      } = req.body;
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userdet = new ApplicationJobUser({
        user: req.user.id,
        company,
        salary,
        title,
        description,
        usernameUsed,
        pwdUsed,
        deadLine,
        interviewDate,
        category,
        location,
        urlUsed,
      });

      const saveduser = await userdet.save();

      res.json([saveduser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 9 - UPDATE APPLICATION "/api/jobtracker/updateApplication/:id"
router.put("/updateApplication/:id", fetchuser, async (req, res) => {
  const {
    company,
    salary,
    title,
    description,
    usernameUsed,
    pwdUsed,
    deadLine,
    interviewDate,
    category,
    location,
    urlUsed,
  } = req.body;
  try {
    //Create a newUser object
    const newApplication = {};
    //validate and check which field is available and update accordingly
    if (company) {
      newApplication.company = company;
    }
    if (salary) {
      newApplication.salary = salary;
    }
    if (title) {
      newApplication.title = title;
    }
    if (description) {
      newApplication.description = description;
    }
    if (usernameUsed) {
      newApplication.usernameUsed = usernameUsed;
    }
    if (pwdUsed) {
      newApplication.pwdUsed = pwdUsed;
    }
    if (deadLine) {
      newApplication.deadLine = deadLine;
    }
    if (interviewDate) {
      newApplication.interviewDate = interviewDate;
    }
    if (category) {
      newApplication.category = category;
    }
    if (location) {
      newApplication.location = location;
    }
    if (urlUsed) {
      newApplication.urlUsed = urlUsed;
    }
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below

    let applicationupdate = await ApplicationJobUser.findById(req.params.id);

    if (!applicationupdate) {
      return req.status(404).send("Not Found");
    }
    if (applicationupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    applicationupdate = await ApplicationJobUser.findByIdAndUpdate(
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

//ROUTE 10 - DELETE JOB APPLICATION "/api/jobtracker/deleteApplication/:id"
router.delete("/deleteApplication/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await ApplicationJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }
    userupdate = await ApplicationJobUser.findByIdAndDelete(req.params.id);
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
