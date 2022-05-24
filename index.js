const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const categories = [
  { id: 1, name: "PC" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Mobile" },
];

app.get("/api/categories", (req, res) => {
  res.send(categories);
});

app.post("/api/categories", (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = {
    id: categories.length + 1,
    name: req.body.name,
  };
  categories.push(category);
  res.send(category);
});

app.put("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  category.name = req.body.name;
  res.send(category);
});

app.delete("/api/categories/:id", (req, res) => {
  const genre = categories.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = categories.indexOf(genre);
  categories.splice(index, 1);

  res.send(genre);
});

app.get("/api/categories/:id", (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
