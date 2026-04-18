require("dotenv").config();

const db_url = process.env.DB_URL.replace(
  "<db_password>",
  process.env.DB_PASSWORD
).replace("<db_user>", process.env.DB_USER);

const config = {
  port: process.env.PORT || 3003,
  database: {
    url: db_url,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER
  }
};

module.exports = config;
