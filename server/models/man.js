const { default: mongoose } = require("mongoose");

const manSchema = new mongoose.Schema({
    type:{
        type:String,
        default:null
    } 
})


const Man = mongoose.model('Man', manSchema);

module.exports = {
    Man
}