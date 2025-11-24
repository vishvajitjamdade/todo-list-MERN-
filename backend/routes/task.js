const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createTask, getTasks,updateTask,deleteTask} = require("../controllers/taskController");

//CREATE
router.post("/",auth,createTask);

//READ
router.get("/",auth,getTasks);

// UPDATE
router.put("/:id", auth, updateTask);

//DELETE
router.delete("/:id",auth,deleteTask);

module.exports = router;