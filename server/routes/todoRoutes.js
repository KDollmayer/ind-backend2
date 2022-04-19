const express = require("express");
const { createTodo, renderTodo, getTodoBySlug, setDone, removeDone } = require("../controllers/todoController");

const router = express.Router()

router.get('/api/todos', renderTodo)
router.post('/api/todos', createTodo);
router.get('/api/todos/:slug', getTodoBySlug);
router.delete("/api/todos/:slug/done",  removeDone)
router.post('/api/todos/:slug/done', setDone);

module.exports = router