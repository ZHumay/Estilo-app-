const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    woman: { type: mongoose.Schema.Types.ObjectId, ref: "Woman" },
    man: { type: mongoose.Schema.Types.ObjectId, ref: "Man" },


})


const Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category
}