const express = require("express");
const router = express.Router();
const Consultant = require("../../models/Consultant");

// @route  POST/api/consultant
//@desc    Register consultant
//@access  Public
router.post("/register-consultant", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    qualification
  } = req.body;
  try {
    let consultant = await Consultant.findOne({ email });
    if (consultant) {
      res
        .status(400)
        .json({ errors: { msg: "Consultant is already registered" } });
    }
    consultant = new Consultant({
      firstname,
      lastname,
      email,
      phone,
      dob,
      gender,
      qualification
    });

    await consultant.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
