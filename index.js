const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routes/todoHandler.js");

const app = express();

mongoose
  .connect(
    process.env.MONGO_CONNECTION_URL // This is just to hide the url, you need to install dotenv to configure.
  )
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/todo", todoHandler);

const errorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err });
};

app.listen(4000, () => {
  console.log("Server is running!");
});
