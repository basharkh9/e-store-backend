const express = require("express");
const categories = require("../routes/categories");
const customers = require("../routes/customers");
const products = require("../routes/products");
const bookings = require("../routes/bookings");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/errors");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/customers", customers);
  app.use("/api/products", products);
  app.use("/api/bookings", bookings);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
