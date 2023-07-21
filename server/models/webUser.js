const { default: mongoose } = require("mongoose");


const webUserSchema = new mongoose.Schema({
    email: String,
    password:String,
    name:String,
    username:String,
    code:String,
    codeExpire: Date,
    isActive: {
        type:Boolean,
        default: false
    },
    codeCounter: {
        type:Number,
        default: 3
    }
})

const WebUser = new mongoose.model('WebUser', webUserSchema);

module.exports = {
    WebUser
}