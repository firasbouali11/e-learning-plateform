const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types

const cart = mongoose.Schema({
    course:{
        type:ObjectId,
        ref:"course",
        required:true
    },
    user:{
        type:ObjectId,
        ref:"user",
        required:true,
    },

})

module.exports = mongoose.model("cart",cart)