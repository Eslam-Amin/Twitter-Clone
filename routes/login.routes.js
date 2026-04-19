const express = require("express");
const User = require("../models/user.model");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");

router
  .get("/", (req, res, next) => {
    const payload = {
      pageTitle: "Login"
    };
    res.status(200).render("login", payload);
  })
  .post("/", async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    let payload = req.body;
    if (usernameOrEmail.trim() || password.trim()) {
      const user = await User.findOne({
        $or: [{ usernameOrEmail }, { email: usernameOrEmail }]
      }).catch((err) => {
        console.log(err);
        payload.errorMessage = "Something went wrong";
        return res.status(400).render("login", payload);
      });
      if (!user) {
        payload.errorMessage = "Invalid username or password";
        return res.status(400).render("login", payload);
      } else if (user) {
        if (!(await bcrypt.compare(password, user.password))) {
          payload.errorMessage = "Invalid username or password";
          return res.status(400).render("login", payload);
        }
      }
      req.session.user = user;
    } else payload.errorMessage = "Make Sure each field has a value";

    return res.redirect("/");
  });

module.exports = router;
