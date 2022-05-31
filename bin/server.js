const app = require("../app");
const mongoose = require("mongoose");

const { DB_HOSTING } = process.env;

mongoose
  .connect(DB_HOSTING)
  .then(() => {
    app.listen(7777, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.mrssege);
    process.exit(1);
  });
