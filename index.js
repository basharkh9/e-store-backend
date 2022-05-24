const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const categories = require("./routes/categories");
const customers = require("./routes/customers");
const products = require("./routes/products");
const bookings = require("./routes/bookings");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

mongoose
  .connect("mongodb://localhost/e-store")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/customers", customers);
app.use("/api/products", products);
app.use("/api/bookings", bookings);
app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
