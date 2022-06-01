const app = require("../app");
const mongoose = require("mongoose");

const { DB_HOSTING } = process.env;

mongoose
  .connect(DB_HOSTING)
  .then(() => {
    console.log("Database connection successful");
    app.listen(7777);
  })
  .then(() => {
    console.log("Server started on port 7777");
  })
  .catch((error) => {
    console.log(error.messege);
    process.exit(1);
  });
