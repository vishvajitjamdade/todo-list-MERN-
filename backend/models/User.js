const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"name is required"],
    },
    email : {
        type : String,
        required : [true, "Email required"],
        unique : true,
    },
    password : {
        type: String,
        required : [true,"Password required"],
        minlength: 6,
    }
}, {timestamps:true});

module.exports = mongoose.model("User",UserSchema);