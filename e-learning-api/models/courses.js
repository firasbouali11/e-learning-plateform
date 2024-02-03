const mongoose = require("mongoose")

const chapters = require("../models/chapters");

const {ObjectId} = mongoose.Schema.Types

const courses = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    cover:{
        type: String,
        required:true
    },
    number_of_students:{
        type:Number,
        default:0
    },
    rate:{
        type:Number,
        default:1,
    },
    category:{
        type:ObjectId,
        ref:"category",
        require:true
    },
    author:{
        type:ObjectId,
        ref:"teacher"
    }
})

module.exports = mongoose.model("course",courses)