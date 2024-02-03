const mongoose = require("mongoose")


const {ObjectId} = mongoose.Schema.Types

const comments = mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"user"
    },
    course:{
        type:ObjectId,
        ref:"course"
    },
    rate:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    seen:{
        type:Boolean,
        default: false
    },
    created:{
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model("comments",comments)