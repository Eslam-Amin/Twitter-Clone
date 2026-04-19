const express = require("express");
const User = require("../models/user.model");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("login");
    });
  }
});

module.exports = router;
