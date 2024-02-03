const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = require("../models/users");
const teacher = require("../models/teachers");

const jwt_secret = "4fezfzedz6546felkxq";
const verifyUser = (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return resp.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwt_secret, (err, payload) => {
    if (err) {
      return resp.status(401).json({ error: "you must be logged innnn" });
    }
    const { id } = payload;
    user
      .findById(id)
      .then((userdata) => {
        req.user = userdata;
      })
      .then(() => {
        next();
      });
  });
};

const verifyTeacher = (req,resp,next)=>{
    const { authorization } = req.headers;
    if (!authorization) {
      return resp.status(401).json({ error: "you must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwt_secret, (err, payload) => {
      if (err) {
        return resp.status(401).json({ error: "you must be logged innnn" });
      }
      const { id } = payload;
      teacher
        .findOne({user_id:id}).populate("user_id")
        .then((userdata) => {
          req.user = userdata;
        })
        .then(() => {
          next();
        });
    });
}

module.exports = {
    verifyUser,verifyTeacher
}
