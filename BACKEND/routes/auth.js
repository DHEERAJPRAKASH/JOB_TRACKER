const express = require("express");
const Doctor = require("../models/JobUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Dheerajisagoodb$oy";

///ROUTE 1: Create a User using : POST "/api/auth/createuser. Doesn't require Auth. no login required"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists already
    try {
      let jobuser = await Doctor.findOne({ email: req.body.email });
      if (jobuser) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      jobuser = await Doctor.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: jobuser.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2 - Login user using : POST "/api/auth/login.
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //to check the valid input
      let jobuser = await Doctor.findOne({ email });
      if (!jobuser) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      //compares the given input password with existing password
      const passwordCompare = await bcrypt.compare(password, jobuser.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: jobuser.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 - Logged in  user details retrieval using : POST "/api/auth/getuser.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const jobUserId = req.user.id;
    const jobUser = await Doctor.findById(jobUserId).select("-password");
    res.send(jobUserId);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
