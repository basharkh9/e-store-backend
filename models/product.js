const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    categoryId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    rate: Joi.number().min(0).max(5).required(),
  });

  return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
