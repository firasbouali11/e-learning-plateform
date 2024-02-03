const users = require("../models/users") 
const courses = require("../models/courses") 

const verifyCourse = async (req,resp,next) =>{
    await users.findById(req.body.userid)
    .then((user) => {
        if(!user.courses.includes(req.params.id,0)) {
            return resp.json({error:"you don't have this course"}) 
        }
        next()
    })
    .catch(e => console.log(e))
}

module.exports= verifyCourse