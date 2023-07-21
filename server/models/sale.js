const { default: mongoose } = require("mongoose");

const saleSchema = new mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, //women, men 
    price:Number,
    size: String,
    color: String ,
    imageUrl: [String],

})


const Sales = mongoose.model('Sales', saleSchema);

module.exports = {
    Sales
}