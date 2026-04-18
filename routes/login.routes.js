const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
  const payload = {
    pageTitle: "Login"
  };
  res.status(200).render("login", payload);
});

module.exports = router;
