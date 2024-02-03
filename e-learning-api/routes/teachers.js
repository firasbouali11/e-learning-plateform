const express = require("express");

const router = express.Router();
const user = require("../models/users");
const teacher = require("../models/teachers");
const courses = require("../models/courses");

router.post("/", (req, resp) => {
  const {
    fullName,
    skills,
    description,
    occupation,
    profileImage,
    cv,
    user_id,
    birthday,
  } = req.body;
  if (  
    !fullName ||
    !skills ||
    !description ||
    !occupation ||
    !cv ||
    !user_id ||
    !birthday
  )
    return resp.status(422).json({ error: "missing fields" });
  teacher.findOne({ user_id: user_id }).then((exitingUser) => {
    if (exitingUser)
      return resp.status(422).json({ error: "already a teacher" });
  });
  const Teacher = new teacher({
    fullName,
    skills,
    description,
    occupation,
    profileImage,
    cv,
    user_id,
    birthday,
  });
  Teacher.save()
    .then(data => resp.json(data))
    .catch((e) => console.log(e));
    
  user.findByIdAndUpdate(user_id,{
      teacher:true
  })
  .catch(e => console.log(e))


  // .then(data => resp.json({message:"creation success"}))
});

router.get("/", (req, resp) => {
  teacher
    .find()
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

// upload cours
router.post("/uploadCourse/:course_id",(req,resp)=>{
  const{teacher_id} = req.body
    teacher.findById(teacher_id)
    .then(user =>{
      user.courses.push(req.params.course_id)
      user.save()
      .then(data => resp.json(data))
      .catch(e => console.log(e))
    })
})

router.get("/getTeacher/:id",(req,resp)=>{
  teacher.findById(req.params.id)
  .then(data=> resp.json(data))
  .catch(e => console.log(e))
})

router.get("/my_courses/:id",(req,resp)=>{
  courses
    .find({author:req.params.id})
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));

})

router.get("/popularOfTeacher/:id",(req,resp)=>{
  courses.find({author:req.params.id}).sort("-number_of_students").limit(6)
  .then(data => resp.json(data))
  .catch(e => console.log(e))
})

router.patch("/:id", (req, resp) => {
  const {  
    skills,
    description,
    occupation,
    profileImage,
  } = req.body;
  if (!skills || !description || !occupation)
    return resp.status(422).json({ error: "missing fields" });
  teacher.updateOne(
    { _id: req.params.id },
    {
      $set: {
        skills : skills,
        description : description,
        occupation : occupation,
        profileImage : profileImage,
      },
    }
  )
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

module.exports = router


