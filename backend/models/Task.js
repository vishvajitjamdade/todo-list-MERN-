const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        index:true
    },

    title:{
        type:String,
        required : true,
        index:true
    },
    description:{
        type: String,
        default: ""
    },
    priority:{
        type:String,
        enum : ["low","medium","high"],
        default: "low",
        index:true
    },

    dueDate:{
        type:Date,
        index:true
    },

    status:{
        type:String,
        enum : ["pending","completed"],
        default: "pending"
    }
},{timestamps: true});

TaskSchema.index({title:"text",description:"text"});

module.exports = mongoose.model("Task",TaskSchema);