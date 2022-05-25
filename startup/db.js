const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/e-store")
    .then(() => winston.info("Connected to MongoDB..."));
};
