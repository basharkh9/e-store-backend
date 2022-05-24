const Joi = require("joi");
const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    product: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        rate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateArrived: {
      type: Date,
    },
    BookingFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateBooking(booking) {
  const schema = {
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
  };

  return Joi.validate(booking, schema);
}

exports.Booking = Booking;
exports.validate = validateBooking;
