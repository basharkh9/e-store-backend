const Joi = require("joi");
const express = require("express");
const router = express.Router();

const categories = [
  { id: 1, name: "PC" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Mobile" },
];

router.get("/", (req, res) => {
  res.send(categories);
});

router.post("/", (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = {
    id: categories.length + 1,
    name: req.body.name,
  };
  categories.push(category);
  res.send(category);
});

router.put("/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  category.name = req.body.name;
  res.send(category);
});

router.delete("/:id", (req, res) => {
  const genre = categories.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = categories.indexOf(genre);
  categories.splice(index, 1);

  res.send(genre);
});

router.get("/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(category);
});

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(category);
}

module.exports = router;
