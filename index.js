const express = require("express");
const categories = require("./routes/categories");
const app = express();

app.use(express.json());
app.use("/api/categories", categories);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
