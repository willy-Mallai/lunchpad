const taskModel = require("../model/taskModel");

// 1. Fetch all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const task = await taskModel.find({ user: req.userId });
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Create a new task
const addTask = async (req, res) => {
  try {
    const { title, priority } = req.body;
    const newTask = await taskModel.create({
      title,
      priority,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Update a task (toggle completion or change title/priority)
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const updateTask = await taskModel.findByIdAndUpdate(taskId, req.body, {
      returnDocument: "after",
    });

    // Hint: The task ID will be in req.params.id
    // Find the task by ID and update it with req.body
    // Return a 200 response with the updated task!
    res.status(200).json({
      success: true,
      data: updateTask,
    });
  } catch (error) {
    // Catch the error and return 500
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    await taskModel.findByIdAndDelete(taskId);

    res.status(200).json({
      success: true,
      message: "Deleted Succesfully",
      data: taskId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Don't forget to export all 4 functions at the bottom!
module.exports = { getTasks, addTask, deleteTask, updateTask };
