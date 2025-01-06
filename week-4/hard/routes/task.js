// Task Routes
const { Router } = require("express");
const Task = require("../models/task");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validators/task.validator");

const taskRouter = Router();

// Get all tasks for user
taskRouter.get("/", async (req, res) => {
  try {
    const id = req.user.id;
    const tasks = await Task.find({ user: id });
    res.json(tasks);
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Get task by id
taskRouter.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Create new task
taskRouter.post("/", async (req, res) => {
  try {
    const { name, description } = createTaskSchema.parse(req.body);
    const newTask = await Task.create({
      name,
      description,
      type: "TODO",
      user: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Update task
taskRouter.put("/:id", async (req, res) => {
  try {
    const { name, description, type } = updateTaskSchema.parse(req.body);

    // Find task by id and update
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, description, type },
      { new: true }
    );

    // Check if task exists
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Update task status
taskRouter.patch("/:id", async (req, res) => {
  try {
    const { type } = updateTaskSchema.parse(req.body);

    // Find task by id and update
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { type },
      { new: true }
    );

    // Check if task exists
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Delete task
taskRouter.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

module.exports = taskRouter;
