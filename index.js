const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routes/todoHandler.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();

mongoose
  .connect(`${process.env.MONGO_CONNECTION_URL}`)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/todo", todoHandler);

app.get("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Daiyan",
  };

  const token = jwt.sign(user, `${process.env.SECRET_KEY_JWT}`);
  res.send({ token });
});

const errorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err });
};

app.listen(4000, () => {
  console.log("Server is running!");
});
