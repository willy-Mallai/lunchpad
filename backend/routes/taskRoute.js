const express = require("express");
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require("../controller/taskController");
const userAuth = require("../middleware/userAuth");

const taskRouter = express.Router();

taskRouter.get("/get-task", userAuth, getTasks);
taskRouter.post("/add-task", userAuth, addTask);
taskRouter.delete("/delete-task/:id", userAuth, deleteTask);
taskRouter.put("/update-task/:id", userAuth, updateTask);

module.exports = taskRouter;
