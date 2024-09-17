const express = require('express');
const { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo } = require('../controller/todoController');
const router = express.Router();




router.route("/").get(getAllTodos).post(createTodo)
router.route("/:id").get(getTodoById).patch(updateTodo).delete(deleteTodo)

module.exports = router; 