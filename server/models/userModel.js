const mongoose = require("mongoose");
const Post = require("./postModel");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    
    email : {
        type : String,
        required : true,
        unique  : true
    },

    profileImage : {
        type : String,
        default : "https://rb.gy/pwxbgy",
        required : false
    },

    password : {
        type : String, 
        required : true
    },

    cPassword : {
        type : String, 
        required : true
    },

    codeExpire:Date,
    isActive:{
        type:Boolean,
        default: false
    },
    code:String,
    codeCounter:{
        type:Number,
        default: 3
    },
    basketItem:{
        type: [],
        required:true
    }
    
}, {timestamps : true});

const User = mongoose.model("user", userSchema);

module.exports = User;



