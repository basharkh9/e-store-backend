const { Booking, validate } = require("../models/booking");
const { Product } = require("../models/product");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init("mongodb://localhost/e-store");

router.get("/", async (req, res) => {
  const bookings = await Booking.find().sort("-dateOut");
  res.send(bookings);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid product.");

  if (product.numberInStock === 0)
    return res.status(400).send("Product not in stock.");

  let booking = new Booking({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    product: {
      _id: product._id,
      name: product.title,
      rate: product.rate,
    },
  });
  try {
    new Fawn.Task()
      .save("bookings", booking)
      .update(
        "products",
        { _id: product._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
  } catch (ex) {
    res.status(500).send("Something failed.");
  }

  res.send(booking);
});

router.get("/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking)
    return res.status(404).send("The booking with the given ID was not found.");

  res.send(booking);
});

module.exports = router;
