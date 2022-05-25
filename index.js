const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/routs")(app);
require("./startup/db")(app);
require("./startup/logging")(app);
require("./startup/config")(app);
require("./startup/validation")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
