const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const app = express();
const port = 3003;
const appRoutes = require("./routes/app.routes");
const session = require("express-session");
const config = require("./config");

app.use(
  session({
    secret: config.session.secret,
    resave: true, // force the session to be saved back to the session store
    saveUninitialized: false // don't create session until something stored
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", appRoutes);

database
  .connect()
  .then(() => {
    console.log("Database connected successfully");
    const server = app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });
