const Todo = require("../models/todoModel");
const jwt = require("jsonwebtoken");

const insertOneTodo = async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: "A server side error occurred" });
    } else {
      res.status(200).json({ status: "Data inserted successfully" });
    }
  });
};

const insertMultipleTodo = async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "A server side error occurred" });
    } else {
      res.status(200).json({ status: "All data's inserted successfully" });
    }
  });
};

const updateTodo = (req, res) => {
  Todo.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        status: "inactive",
      },
    }
  )
    .then(() => {
      res.status(200).json({ status: "data updated successfully" });
    })
    .catch(() => {
      res.status(500).json({ error: "A server side error occurred" });
    });
};

const getAllTodos = (req, res) => {
  console.log(req.headers["authorization"]);
  Todo.find({ status: "active" })
    .then((data) => {
      res.status(200).json({ result: data });
    })
    .catch(() => {
      res.status(500).json({ error: "A server side error occurred" });
    });
};

const getTodoById = (req, res) => {
  if (typeof req.headers["authorization"] != "undefined") {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);
    if (token) {
      jwt.verify(
        token,
        `${process.env.SECRET_KEY_JWT}`,
        function (err, decoded) {
          console.log(decoded.name);
          if (decoded.id) {
            Todo.find({ _id: req.params.id })
              .then((data) => {
                res.status(200).json({ result: data });
              })
              .catch(() => {
                res.status(500).json({ error: "A server side error occurred" });
              });
          } else {
            res.status(500).send("Server side error occurred");
          }
        }
      );
    } else {
      res.status(401).send("Authorization error");
    }
  } else {
    res.status(401).send("Authorization error");
  }
};

const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ result: "Todo deleted successfully" });
    })
    .catch(() => {
      res.status(500).json({ error: "A server side error occurred" });
    });
};

module.exports = {
  insertOneTodo,
  insertMultipleTodo,
  updateTodo,
  getAllTodos,
  getTodoById,
  deleteTodo,
};
