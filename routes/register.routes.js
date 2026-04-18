const express = require("express");
const app = express();
const router = express.Router();

router
  .get("/", (req, res, next) => {
    const payload = {
      pageTitle: "Register"
    };
    res.status(200).render("register", payload);
  })
  .post("/", (req, res, next) => {
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
    } else {
      payload.errorMessage = "Make Sure each field has a value";
    }
    res.status(200).render("register", payload);
  });

module.exports = router;
