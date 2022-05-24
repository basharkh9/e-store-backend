const mongoose = require("mongoose");
const express = require("express");
const categories = require("./routes/categories");
const customers = require("./routes/customers");
const app = express();

mongoose
  .connect("mongodb://localhost/e-store")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/customers", customers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
