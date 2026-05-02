const router = require("express").Router();

const auth = require("../middleware/auth");
const ctrl = require("../controllers/taskController");

// 🔥 IMPORTANT: EDIT route FIRST
router.put("/edit/:id", auth, ctrl.updateTask);

// other routes
router.post("/", auth, ctrl.createTask);
router.get("/", auth, ctrl.getTasks);
router.put("/:id", auth, ctrl.updateStatus);
router.delete("/:id", auth, ctrl.deleteTask);

module.exports = router;