const mongoose = require("mongoose");
const config = require("./config");

class Database {
  constructor() {
    // this.connect();
  }

  connect() {
    console.log("🚀 ~ Database ~ connecting ~");
    return mongoose.connect(config.database.url);
  }

  disconnect() {
    return mongoose.disconnect();
  }
}

module.exports = new Database();
