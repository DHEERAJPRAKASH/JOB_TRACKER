const express = require("express");
const Doctor = require("../models/JobUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
var fetchdoctor = require("../middleware/fetchdoctor");
const JWT_SECRET = "Dheerajisagoodb$oy";

//ROUTE 1: Create a User using : POST "/api/auth/createuser. Doesn't require Auth. no login required"
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
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
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
  "/login",
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
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      //compares the given input password with existing password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
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
router.post(
  "/getuser",fetchuser,
  async (req, res) => {

    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 4: Create a Doctor using : POST "/api/auth/createdoctor. Doesn't require Auth. no login required"
router.post(
  "/createdoctor",
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
      let doctor = await Doctor.findOne({ email: req.body.email });
      // console.log(user);
      if (doctor) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      doctor = await Doctor.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: doctor.id,
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

//ROUTE 5 - Login doctor using : POST "/api/auth/logindoctor.
router.post(
  "/logindoctor",
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
      let doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      //compares the given input password with existing password
      const passwordCompare = await bcrypt.compare(password, doctor.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: doctor.id,
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

//ROUTE 3 - Logged in  doctor details retrieval using : POST "/api/auth/getdoctor.
router.post(
  "/getdoctor",fetchdoctor,
  async (req, res) => {

    try {
      // console.log("success in id")
      const doctorId = req.doctor.id;
      // console.log(doctorId);
      const doctor = await Doctor.findById(doctorId).select("-password");
      res.send(doctor);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);




module.exports = router;
