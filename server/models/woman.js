const { default: mongoose } = require("mongoose");

const womanSchema = new mongoose.Schema({
    type:{
        type:String,
        default:null
    } 

   //sweater,pants etc..
})


const Woman = mongoose.model('Woman', womanSchema);

module.exports = {
    Woman
}