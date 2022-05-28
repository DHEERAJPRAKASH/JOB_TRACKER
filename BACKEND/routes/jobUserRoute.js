const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchdoctor");
const DetailJobUser = require("../models/DetailJobUser");
// const UploadUsers = require("../models/UploadDetail");

const { body, validationResult } = require("express-validator");

//ROUTE 1 - Logged in  user details retrieval using : GET "/api/userdetails/getuser.LOGIN REQUIRED

router.get("/fetchuserdetails", fetchuser, async (req, res) => {
  try {
    const detailuser = await DetailJobUser.find({ user: req.users.id });

    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//To fetch all user list without authentication
router.get("/fetchAlluserdetails", async (req, res) => {
  try {
    const detailuser = await DetailJobUser.find();

    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE 2 - Logged in  user details adding details : GET "/api/userdetails/adduser.LOGIN REQUIRED
router.post(
  "/adduser",
  fetchuser,
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("mobileno", "Enter a valid mobile").isLength({ min: 10 }),
    body("designation", "Enter a valid designation").isLength({ min: 3 }),
    body("working", "Enter a valid working").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { name, mobileno, designation, working } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //   console.log(req.user.id);
      console.log(req.users.id);
      const userdet = new DetailJobUser({
        user: req.users.id,
        // user:req.user.id,
        name,
        mobileno,
        designation,
        working,
      });

      //   console.log(userdet);

      const saveduser = await userdet.save();

      res.json([saveduser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 - Logged in  user details updating details : GET "/api/userdetails/updateuser.LOGIN REQUIRED
router.put("/updateuser/:id", fetchuser, async (req, res) => {
  const { name, mobileno, designation, working } = req.body;

  console.log(req.body);
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
    console.log("i am in");
    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    console.log(req.params.id);
    let userupdate = await DetailJobUser.findById(req.params.id);
    console.log(userupdate);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }
    if (userupdate.user.toString() !== req.users.id) {
      return req.status(401).send("Not Allowed");
    }

    console.log("i am in 2");

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


//ROUTE 4 - Logged in  user details deleting details : GET "/api/userdetails/deleteuser.LOGIN REQUIRED
router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await DetailJobUser.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.users.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await DetailJobUser.findByIdAndDelete(req.params.id);
    res.json({ Success: "User Details has been deleted", userupdate: userupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.get(
  "/uploadDetail",
  fetchuser,
  // upload.single('userImage'),
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("worknature", "Enter a valid worknature").isLength({ min: 4 }),
    body("exercisedaily", "Enter a valid value for exercise daily").isBoolean(),
    body("eatingdiet", "Enter a valid value for eating diet").isBoolean(),
    body(
      "alcoholconsumption",
      "Enter a valid value for alcoholconsumption"
    ).isBoolean(),
    body(
      "caffeineconsumption",
      "Enter a valid value for caffeineconsumption"
    ).isBoolean(),
    body("smoking", "Enter a valid value for smoking").isBoolean(),
    body("othercomments", "Enter a valid othercomments").isLength({ min: 3 }),
    body(
      "list_of_drug_allergies",
      "Enter a valid list_of_drug_allergies"
    ).isLength({ min: 3 }),
    body("other_illnesses", "Enter a valid other_illnesses").isLength({
      min: 3,
    }),
    body("list_of_operations", "Enter a valid list_of_operations").isLength({
      min: 3,
    }),
    body(
      "list_of_current_medications",
      "Enter a valid list_of_current_medications"
    ).isLength({ min: 3 }),
    // added on 10/01/2022
    // upload.single('userImage')
  ],
  async (req, res) => {
    try {
      // added on 10/01/2022

      const {
        name,
        worknature,
        exercisedaily,
        eatingdiet,
        alcoholconsumption,
        caffeineconsumption,
        smoking,
        othercomments,
        list_of_drug_allergies,
        other_illnesses,
        list_of_operations,
        list_of_current_medications,
        // userImage
      } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);
      // const {data, mimetype}=req.files.userImage;
      console.log(req.body.smoking);

      // console.log("path of file: "+req.files.userImage.path);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userdet = new UploadUsers({
        user: req.user.id,
        name,
        worknature,
        exercisedaily,
        eatingdiet,
        alcoholconsumption,
        caffeineconsumption,
        smoking,
        othercomments,
        list_of_drug_allergies,
        other_illnesses,
        list_of_operations,
        list_of_current_medications,
      });

      // upload.single(req.files.userImage);
      const savedUser = await userdet.save();
      console.log("saved user" + savedUser);

      res.json([savedUser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/fetchconsult", fetchuser, async (req, res) => {
  try {
    const user = req.users.id;
    console.log(req.users);
    // console.log("user id:"+user.toString());
    const doc = user.toString();
    console.log("user id:" + doc);
    const detailuser = await UploadUsers.find({ user: req.users.id });
    // const detailuser = await UploadUsers.find({ user: "61ece8918604f561b005a7cf" });
    console.log(detailuser);
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/fetchconsult/:id", fetchuser, async (req, res) => {
  const {
    name,
    worknature,
    exercisedaily,
    eatingdiet,
    alcoholconsumption,
    caffeineconsumption,
    smoking,
    othercomments,
    list_of_drug_allergies,
    other_illnesses,
    list_of_operations,
    list_of_current_medications,
    userComments,
  } = req.body;

  try {
    //Create a newUser object
    const newUser = {};
    console.log("I am id:" + req.params.id);
    //validate and check which field is available and update accordingly
    if (name) {
      newUser.name = name;
    }
    if (worknature) {
      newUser.worknature = worknature;
    }

    newUser.exercisedaily = exercisedaily;
    newUser.eatingdiet = eatingdiet;
    newUser.alcoholconsumption = alcoholconsumption;
    newUser.caffeineconsumption = caffeineconsumption;
    newUser.smoking = smoking;

    if (othercomments) {
      newUser.othercomments = othercomments;
    }
    if (list_of_drug_allergies) {
      newUser.list_of_drug_allergies = list_of_drug_allergies;
    }
    if (other_illnesses) {
      newUser.other_illnesses = other_illnesses;
    }
    if (list_of_operations) {
      newUser.list_of_operations = list_of_operations;
    }
    if (list_of_current_medications) {
      newUser.list_of_current_medications = list_of_current_medications;
    }
    if (userComments) {
      newUser.userComments = userComments;
    }

    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    let userupdate = await UploadUsers.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    console.log("user update:" + req.body);
    console.log("user id:" + req.user.id);
    if (userupdate.user.toString() !== req.users.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await UploadUsers.findByIdAndUpdate(
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

module.exports = router;
