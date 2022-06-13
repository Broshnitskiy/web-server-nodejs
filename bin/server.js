const app = require("../app");
const mongoose = require("mongoose");

const { DB_HOSTING, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOSTING)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server started on port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.messege);
    process.exit(1);
  });
