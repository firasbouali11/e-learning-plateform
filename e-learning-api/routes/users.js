const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const jwt_secret = "kfhzekjfhkzjeh5ezf4ze5f";

const router = express.Router();
const User = require("../models/users");
const teacher = require("../models/teachers");
const courses = require("../models/courses");
const users = require("../models/users");

router.get("/", (req, resp) => {
  User.find()
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.post("/signin", (req, resp) => {
  const { username, password } = req.body;

  if (!username || !password)
    return resp.status(422).json({ error: "missing fields" });

  User.findOne({ username: username }).then((existingUser) => {
    if (existingUser) {
      const hashedPassword = md5(password);
      if (hashedPassword === existingUser.password) {
        token = jwt.sign({ id: existingUser._id }, jwt_secret);
        existingUser.password = undefined;
        if(existingUser.teacher == true){
          teacher.findOne({user_id:existingUser._id}).populate("user_id","courses progress teacher username email _  id")
          .then(data => {
            return resp.json({token:token,user:data})
          })
          .catch(e => console.log(e))
        }
        else return resp.json({ token: token, user: existingUser });
      } 
      else return resp.status(422).json({ error: "Invalid Credentials" });
    } 
    else return resp.status(422).json({ error: "Invalid Credentials" });
  });
});

router.post("/", (req, resp) => {
  const { username, password, password2, email,courses,progress } = req.body;
  if (!username || !password || !password2 || !email) {
    return resp.status(422).json({ error: "missing fields" });
  }
  if (password !== password2)
    return resp.status(422).json({ error: "password not match" });
  User.findOne({ username: username }).then((existingUser) => {
    if (existingUser) return resp.status(422).json({ error: "username exist" });
    else{
      const hashedPassword = md5(password);
      const user = new User({
        username:username,
        email:email,
        password: hashedPassword,
        courses:courses,
        progress:progress
      });
      user
        .save()
        .then((data) => resp.json(data))
        .catch((e) => console.log(e));
    }
  });
 
});

router.patch("/:id", (req, resp) => {
  const { username, email, password } = req.body;
  const hashedPassword = md5(password)
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        username,
        email,
        password:hashedPassword,
      },
    }
  )
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.delete("/:id", (req, resp) => {
  User.remove({ _id: req.params.id })
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.post("/my_courses", (req, resp) => {
  const { cc } = req.body;
  courses
    .find({_id:{$in : cc}})
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.patch("/progress/:course_id",async (req,resp)=>{   
  const {user_id,currentChapter} = req.body
  let prog = []
  await User.findById(user_id)
  .then(data =>{
    const index = data.courses.indexOf(req.params.course_id)
    data.progress[index] = currentChapter
    prog = [...data.progress]
    // data.save()
    // .then(data => resp.json(data))
    // .catch(e => console.log(e))
  })
  User.updateOne({_id:user_id},{
    $set:{
      progress:prog
    }
  })
  .then(data => resp.json(data))
  .catch(e => console.log(e))
})

router.post("/progress/:course_id",async (req, resp) => {
  const {user_id} = req.body
  await User.findById(user_id)
    .then((data) => resp.json(data.progress[data.courses.indexOf(req.params.course_id)]))
    .catch((e) => console.log(e));
})

router.post("/buyCourse/:course_id",(req,resp)=>{
  const{user_id} = req.body
    User.findById(user_id)
    .then(user =>{
      user.courses.push(req.params.course_id)
      user.progress.push(0)
      user.save()
      .then(data => resp.json(data))
      .catch(e => console.log(e))
    })
    
    courses.findById(req.params.course_id)
      .then(course =>{
        course.number_of_students = course.number_of_students+1
        course.save()
        .then((data) => resp.json(data))
        .catch((e) => console.log(e));
      })
      
    
})

router.get("/:id",(req,resp)=>{
  users.findById(req.params.id)
  .then(data => {
    data.password = undefined
    resp.json(data)
  })
  .catch(e => console.log(e))
})



module.exports = router;
