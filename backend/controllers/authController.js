const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRE}
    );
};

//register
exports.register = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        //check existing user
        const exist = await User.findOne({email});
        if(exist) return res.status(400).json({message : "Email already exists"});

        //hash password
        const hashedPass = await bcrypt.hash(password,10);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPass,
        });

        res.status(201).json({
            message : "User registeres successfully",
            user:{
                id : user._id,
                name,
                email,
            },
            token : generateToken(user._id)
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//LOGIN
exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;

        //find user
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});

        //compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Wrong password"});

        res.json({
            message: "Login successful",
            user : {
                id : user._id,
                name:user.name,
                email:user.email,
            },
            token: generateToken(user._id)
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};