const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/user.model");

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
          res.status(400).render("register", payload);
        }
      );
      if (user) {
        if (user.email === email) payload.errorMessage = "Email already exists";
        else if (user.username === username)
          payload.errorMessage = "Username already exists";
        res.status(400).render("register", payload);
      } else {
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
          passwordConf: passwordConf
        });
        user.save();
        res.redirect("/login");
      }
    } else {
      payload.errorMessage = "Make Sure each field has a value";
    }
    res.status(200).render("register", payload);
  });

module.exports = router;
