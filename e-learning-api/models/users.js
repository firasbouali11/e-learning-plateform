var mongoose=require('mongoose');


const {ObjectId} = mongoose.Schema.Types
const user=mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    courses:{
        type:[ObjectId], 
        ref:"course"
    },
    progress:{
        type:[Number],
    },
    teacher:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('user',user);
