const Task = require("../models/Task");
const Project = require("../models/Project"); // ✅ added


// 🔹 CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, dueDate, project, assignedTo } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and due date are required",
      });
    }

    // ✅ NEW: validate assigned user belongs to project
    if (project && assignedTo) {
      const proj = await Project.findById(project);

      if (!proj) {
        return res.status(404).json({ message: "Project not found" });
      }

      const isMember = proj.members.some(
        (m) => m.toString() === assignedTo
      );

      if (!isMember) {
        return res.status(400).json({
          message: "Assigned user must be a project member",
        });
      }
    }

    const task = await Task.create({
      title,
      dueDate,
      project,
      assignedTo,
      user: req.user.id,
      status: "todo",
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 GET TASKS
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate("user", "name email")
        .populate("assignedTo", "name")
        .populate("project", "name");
    } else {
      tasks = await Task.find({ user: req.user.id })
        .populate("assignedTo", "name")
        .populate("project", "name");
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 UPDATE STATUS (quick buttons)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let task;

    if (req.user.role === "admin") {
      task = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
    } else {
      task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { status },
        { new: true }
      );
    }

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 FULL EDIT TASK (title + date + status)
exports.updateTask = async (req, res) => {
  try {
    const { title, dueDate, status } = req.body;

    let task;

    if (req.user.role === "admin") {
      task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, dueDate, status },
        { new: true }
      );
    } else {
      task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title, dueDate, status },
        { new: true }
      );
    }

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    let task;

    if (req.user.role === "admin") {
      task = await Task.findByIdAndDelete(req.params.id);
    } else {
      task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
    }

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};