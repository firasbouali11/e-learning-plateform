const express = require("express")

const router = express.Router()
const categories = require("../models/categories")

router.get("/",(req,resp)=>{
    categories.find()
    .then(data=>resp.json(data))
    .catch(e => console.log(e))
})


router.post("/",(req,resp)=>{
    const {category,image} = req.body
    if(! category || !image) return resp.status(422).json({error:"missing fields"})
    const cat = new categories({
        category,image
    })
    cat.save()
    .then(data => resp.json(data))
    .catch(e => console.log(e))
})


router.delete("/:id",(req,resp)=>{
    categories.remove({_id:req.params.id})
    .then(data => resp.json(data))
    .catch(e => console.log(e))
    
})

module.exports = router