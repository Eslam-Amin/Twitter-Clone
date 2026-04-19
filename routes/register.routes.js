const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router
  .get("/", (req, res, next) => {
    const payload = {
      pageTitle: "Register"
    };
    res.status(200).render("register", payload);
  })
  .post("/", async (req, res, next) => {
    const { firstName, lastName, username, email, password, passwordConf } =
      req.body;
    let payload = req.body;
    if (
      firstName.trim() ||
      lastName.trim() ||
      username.trim() ||
      email.trim() ||
      password.trim() ||
      passwordConf.trim()
    ) {
      const user = await User.findOne({ $or: [{ email }, { username }] }).catch(
        (err) => {
          console.log(err);
          payload.errorMessage = "Something went wrong";
          return res.status(400).render("register", payload);
        }
      );
      if (user) {
        if (user.email === email) payload.errorMessage = "Email already exists";
        else if (user.username === username)
          payload.errorMessage = "Username already exists";
        return res.status(400).render("register", payload);
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword
        });
        user.save();
        return res.redirect("/login");
      }
    } else {
      payload.errorMessage = "Make Sure each field has a value";
    }
    return res
      .status(200)
      .render("register", { ...payload, pageTitle: "Register" });
  });

module.exports = router;
