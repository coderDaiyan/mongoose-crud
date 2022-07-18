const Todo = require("../models/todoModel");

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
  Todo.find({ status: "active" })
    .then((data) => {
      res.status(200).json({ result: data });
    })
    .catch(() => {
      res.status(500).json({ error: "A server side error occurred" });
    });
};

const getTodoById = (req, res) => {
  Todo.find({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({ result: data });
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
};
