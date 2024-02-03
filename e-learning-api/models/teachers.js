const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types
const teacher = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    birthday:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:"",
    },
    cv:{
        type:String,
        required:true,
    },
    occupation:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:ObjectId,
        ref:"user",
        required:true
    },
    courses:{
        type:[ObjectId],
    }
})

module.exports = mongoose.model("teacher",teacher)