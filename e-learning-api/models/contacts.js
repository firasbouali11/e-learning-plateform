const mongoose = require("mongoose")


const contacts = mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    approve:{
        type: Number,
        default:0
    }
})

module.exports = mongoose.model("contact",contacts)