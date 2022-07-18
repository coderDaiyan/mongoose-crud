const express = require("express");
const {
  insertOneTodo,
  insertMultipleTodo,
  getTodoById,
  getAllTodos,
  deleteTodo,
} = require("../controller/todoController.js");
const { updateOne } = require("../models/todoModel.js");

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
router.delete("/:id", deleteTodo);

module.exports = router;
