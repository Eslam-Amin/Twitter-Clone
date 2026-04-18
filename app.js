const path = require("path");
const express = require("express");
const app = express();
const port = 3003;
const appRoutes = require("./routes/app.routes");

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", appRoutes);

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
