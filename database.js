const mongoose = require("mongoose");
const config = require("./config");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(config.database.url)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log("Database connection error: " + err);
      });
  }

  disconnect() {
    mongoose.disconnect();
  }
}

module.exports = new Database();
