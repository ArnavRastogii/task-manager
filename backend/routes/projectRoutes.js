const router = require("express").Router();
const auth = require("../middleware/auth");
const Project = require("../models/Project");

// 🔹 CREATE PROJECT
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name required" });
    }

    const project = await Project.create({
      name,
      owner: req.user.id,
      members: [req.user.id], // creator auto added
    });

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 GET PROJECTS (user-based)
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    }).populate("owner", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 ADD MEMBER (admin/owner logic optional)
router.put("/:id/add-member", auth, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ only owner can add (optional rule)
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
    }

    await project.save();

    res.json(project);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id, // only owner can delete
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or unauthorized",
      });
    }

    res.json({ message: "Project deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;