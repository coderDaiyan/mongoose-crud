const express = require("express");
const {
  insertOneTodo,
  insertMultipleTodo,
  getTodoById,
  getAllTodos,
} = require("../controller/todoController.js");
const { updateOne } = require("../models/todoModel.js");
const Todo = require("../models/todoModel.js");

const router = express.Router();

// Get all todo
router.get("/", getAllTodos);

// Get todo by ID
router.get("/:id", getTodoById);

// Insert one todo
router.post("/", insertOneTodo);

// Insert multiple todo
router.post("/all", insertMultipleTodo);

// Update todo
router.put("/:id", updateOne);

// Delete todo
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ result: "Todo deleted successfully" });
    })
    .catch(() => {
      res.status(500).json({ error: "A server side error occurred" });
    });
});

module.exports = router;
