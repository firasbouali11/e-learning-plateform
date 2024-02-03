const express = require("express")
const chapters = require("../models/chapters")

const router = express.Router()

router.get("/:course_id",(req,resp)=>{
    chapters.find({course_id:req.params.course_id})
    .then(data => resp.json(data))
    .catch(e => console.log(e))
})

router.post("/",(req,resp)=>{
    const {course_id,title,video,n_chapter} = req.body

    const Chapter = new chapters({
        course_id:course_id,
        video:video,
        title:title,
        n_chapter:n_chapter
    })
    Chapter.save()
    .then(data => resp.json(data))
    .catch(e => console.log(data))
})

router.patch("/",(req,resp)=>{
    const {title,chapter_id,video} = req.body
    chapters.findByIdAndUpdate(chapter_id,{
        title:title,
        video:video
    })
    .then(data => resp.json(data))
    .catch(e => console.log(e))
})

router.delete("/:course_id",(req,resp)=>{
    chapters.findByIdAndDelete(req.params.course_id)
    .then(data => resp.json(data))
    .catch(e => console.log(e))
})
module.exports = router