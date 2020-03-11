const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.send("Post Works"));

module.exports = router;
