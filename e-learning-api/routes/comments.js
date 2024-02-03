const express = require("express")

const router = express.Router()
const comments = require("../models/comments")

router.get("/:course_id",(req,resp)=>{
    comments.find({course:req.params.course_id}).populate("user","username")
    .then(data =>{
        resp.json(data)
    })
    .catch(e => console.log(e))
})

router.post("/",(req,resp)=>{
    const {user,course,rate,comment} = req.body

    if(!rate || !comment) return resp.status(400).json({error:"missing fields"})

    const commentaire = new comments({
        user,course,rate,comment
    })
    
    commentaire.save()
    .then(data => resp.json(data))
    .catch(e => console.log(e))
})

router.patch("/approve",(req,resp)=>{
    const {id} = req.body
    comments.updateOne({_id:id},{
        $set:{approve:1}
    })
    .then(data => console.log(data))
    .catch(e => console.log(e))
})

router.patch("/seen",(req,resp)=>{
    const {id} = req.body
    comments.updateOne({_id:id},{
        $set:{seen:true}
    })
    .then(data => resp.json(data))
    .catch(e=>console.log(e))
})

module.exports = router