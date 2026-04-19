const path = require("path");
require("dotenv").config({
  quiet: true,
  path: path.join(__dirname, "..", ".env")
});

const db_url = process.env.DB_URL.replace(
  "<db_password>",
  process.env.DB_PASSWORD
).replace("<db_user>", process.env.DB_USER);

const config = {
  port: process.env.PORT || 3003,
  session: {
    secret: process.env.SESSION_SECRET
  },
  database: {
    url: db_url,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER
  }
};

module.exports = config;
