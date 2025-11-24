const Task = require("../models/Task");

//CREATE TASK
exports.createTask = async (req,res) => {
    try{
        const {title, description, priority,dueDate} = req.body;

        const newTask = await Task.create({
            userId : req.user,
            title,
            description,
            priority,
            dueDate
        });

        res.status(201).json({
            message : "Task created",
            task: newTask
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//GET ALL TASK (FAST + FILTERED)
exports.getTasks = async (req,res) => {
    try{
        const tasks = await Task
        .find({userId : req.user})
        .select("title priority status dueDate description createdAt")// returns only essentials fields
        .lean(); // super-fast JSON result

        res.json({tasks});
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

//UPDATE TASK
exports.updateTask = async (req,res) => {
    try{
        const taskId = req.params.id;

        const updated = await Task.findOneAndUpdate(
            {_id:taskId, userId:req.user},
            req.body,
            {new : true}
        ).lean();

        if(!updated){
            return res.status(404).json({message : "Task not found"});
        }

        res.json({
            message : "Task updated",
            task:updated
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//DELETE TASK
exports.deleteTask = async(req,res) => {
    try{
        const taskId = req.params.id;

        const deleted = await Task.findOneAndDelete({
            _id:taskId,
            userId:req.user
        }).lean();

        if(!deleted) {
            return res.status(404).json({message:"Task not found"});
        }

        res.json({message : "Task deleted"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};