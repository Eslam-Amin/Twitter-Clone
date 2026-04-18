const express = require("express");
const app = express();
const appRoutes = express.Router();
const middleware = require("../middleware");

app.set("view engine", "pug");
app.set("views", "views");

// Routes
const loginRoutes = require("./login.routes");
appRoutes.use("/", loginRoutes);

appRoutes.get("/", middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: "Home"
  };
  res.status(200).render("home", payload);
});

module.exports = appRoutes;
