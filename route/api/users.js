const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
// @route  POST/api/users
//@desc    Register user
//@access  Public
router.post(
  "/register",
  [
    check("firstname", "First Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password should be between 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    // See if user exist
    const {
      firstname,
      lastname,
      email,
      password,
      dob,
      gender,
      qualification
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: { msg: "User is already registered" } });
      }
      user = new User({
        firstname,
        lastname,
        email,
        password,
        dob,
        gender,
        qualification
      });
      // // hashing the password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // // Returning the jwt token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
