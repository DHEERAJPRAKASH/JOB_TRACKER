const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const upload = require("../routes/fileUpload");
const DetailJobUser = require("../models/DetailJobUser");
const app = express();
app.use("/uploads", express.static("uploads"));

const { body, validationResult } = require("express-validator");

//ROUTE 1 - Logged in  user details retrieval using : GET "/api/jobtracker/getuser.LOGIN REQUIRED

router.get("/fetchuserdetails", fetchuser, async (req, res) => {
  try {
    const detailuser = await DetailJobUser.find({ user: req.user.id });
    res.json(detailuser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//To fetch all user list without authentication
router.get("/getUser", async (req, res) => {
  try {
    const detailuser = await DetailJobUser.find();

    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE 2 - Logged in  user details adding details : GET "/api/jobtracker/adduser.LOGIN REQUIRED
router.post(
  "/adduser",
  fetchuser,
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { name, mobileno, designation, working, about, location, email } =
        req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userdet = new DetailJobUser({
        user: req.user.id,
        name,
        mobileno,
        designation,
        working,
        about,
        location,
        email,
      });

      const saveduser = await userdet.save();

      res.json([saveduser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 - Logged in  user details updating details : GET "/api/jobtracker/updateuser.LOGIN REQUIRED
router.put("/updateuser/:id", fetchuser, async (req, res) => {
  const { name, mobileno, designation, working, about, location, email } =
    req.body;

  try {
    //Create a newUser object
    const newUser = {};
    //validate and check which field is available and update accordingly
    if (name) {
      newUser.name = name;
    }
    if (mobileno) {
      newUser.mobileno = mobileno;
    }
    if (designation) {
      newUser.designation = designation;
    }
    if (working) {
      newUser.working = working;
    }
    if (email) {
      newUser.email = email;
    }
    if (location) {
      newUser.location = location;
    }
    if (about) {
      newUser.about = about;
    }
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    let userupdate = await DetailJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }
    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }
    userupdate = await DetailJobUser.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json({ userupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 - Logged in  user details deleting details : GET "/api/jobtracker/deleteuser.LOGIN REQUIRED
router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await DetailJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await DetailJobUser.findByIdAndDelete(req.params.id);
    res.json({
      Success: "User Details has been deleted",
      userupdate: userupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 5 - Logged in  user details upload documents : POST "/api/jobtracker/uploadDoc/:id
router.post(
  "/uploadDoc/:id",
  upload.array("file[]"),
  async (req, res) => {
    const userpost = await DetailJobUser.findById(req.params.id);
    console.log(req.body)
    if (req.files) {
      let path = "";
      req.files.forEach((files, index, arr) => {
        path = path + files.path + ",";
      });
      path = path.substring(0, path.lastIndexOf(","));
      userpost.file = path;
      const savedPost = await userpost.save();
      res.json(savedPost);
    }
  }
);

//ROUTE 6 - Logged in  user details to view documents : GET "/api/jobtracker/uploadDoc/:id
router.get("/getDoc", fetchuser, async (req, res) => {
  const userpost = await DetailJobUser.find({ user: req.user.id });
  if (userpost != null) {
    res.json(userpost);
  } else {
    res.status(404).send("File not found");
  }
});

module.exports = router;
