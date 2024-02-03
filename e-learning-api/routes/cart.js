const express = require("express");

const router = express.Router();

const cart = require("../models/cart");
const users = require("../models/users");

router.get("/:id", (req, resp) => {
  // const { user_id } = req.body;
  cart
    .find({user:req.params.id})
    .populate("course")
    .then((data) => resp.json(data))
    .catch((e) => console(e));
});

router.post("/", (req, resp) => {
  const { course, user } = req.body;
  cart.findOne({course:course._id,user:user._id})
  .then(existingCart => {
    if(existingCart) return resp.json({error:"already in cart"})
    users.findById(user._id)
    .then(user => {
      if(user.courses.includes(course._id,0)) return resp.json({error:"already bought"})
      else{
        const Cart = new cart({
          course,
          user,
        });
        Cart.save()
          .then((data) => resp.json(data))
          .catch((e) => console.log(e));
      }
  })
  })
 
});

router.delete("/", (req, resp) => {
  const { id } = req.body;
  cart
    .remove({ _id: id })
    .then((data) => resp.json(data))
    .catch((e) => console.log(data));
});

router.get("/byuser/:id",(req,resp)=>{
  cart.find({user:req.params.id}).populate("course")
  .then(data => resp.json(data))
  .catch(e => console.log(e))
})

router.get("/",(req,resp)=>{
  cart.find()
  .then(data => resp.json(data))
  .catch(e => console.log(e))
})

module.exports = router