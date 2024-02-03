const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types
const chapters = mongoose.Schema({

    course_id:{
        type:ObjectId,
        ref:"course",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    n_chapter:{
        type:Number,
        required:true
    },
    video:{
        type:String,
        required:true
    },
})

module.exports =  mongoose.model("chapter",chapters)