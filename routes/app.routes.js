const express = require("express");
const app = express();
const appRoutes = express.Router();
const middleware = require("../middleware");

// Routes
const loginRoutes = require("./login.routes");
const logoutRoutes = require("./logout.routes");
const registerRoutes = require("./register.routes");
const postRoutes = require("./apis/post.routes");

appRoutes.use("/login", loginRoutes);
appRoutes.use("/logout", logoutRoutes);
appRoutes.use("/register", registerRoutes);
appRoutes.use("/api/posts", postRoutes);

appRoutes.get("/", middleware.requireLogin, (req, res, next) => {
  const user = req.session.user;
  const payload = {
    pageTitle: "Home",
    loggedInUser: user
  };
  res.status(200).render("home", payload);
});

module.exports = appRoutes;
