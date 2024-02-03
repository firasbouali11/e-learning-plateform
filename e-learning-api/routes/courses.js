const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const courses = require("../models/courses");
const chapters = require("../models/chapters");
const { pagination } = require("../middlewares/pagination");
const verifyCourse = require("../middlewares/ownCourses");

router.get("/", (req, resp) => {
  courses
    .find()
    .populate("category", "_id category")
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.post("/", (req, resp) => {
  const {
    title,
    level,
    description,
    price,
    cover,
    chapters,
    author,
    category,
  } = req.body;
  if (
    !title ||
    !level ||
    !description ||
    !price ||
    !cover ||
    !category ||
    !author
  )
    return resp.status(422).json({ error: "missing fields" });

  const course = new courses({
    title,
    level,
    cover,
    description,
    price,
    category,
    author,
  });
  course
    .save()
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.patch("/:id", (req, resp) => {
  const { title, level, description, price, cover } = req.body;

  courses
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          title,
          level,
          description,
          price,
          cover,
        },
      }
    )
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.delete("/:id", (req, resp) => {
  courses
    .remove({ _id: req.params.id })
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.post("/chapter/add", (req, resp) => {
  const { id, title, video, n_chapter } = req.body;
  courses.findById(id).then((data) => {
    data.chapters.push({
      title,
      video,
      n_chapter,
    });
    data.save().then((data) => resp.json(data));
  });
});

router.post("/chapter/delete/:nb", (req, resp) => {
  const { id } = req.body;
  courses.findById(id).then((data) => {
    data.chapters.splice(req.params.nb - 1, 1);
    data.save().then((data) => resp.json(data));
  });
});

router.post("/chapter/update/:nb", (req, resp) => {
  const { id, title, video } = req.body;
  courses.findById(id).then((data) => {
    data.chapters[req.params.nb - 1].title = title;
    data.chapters[req.params.nb - 1].video = video;
    data
      .save()
      .then((data) => resp.json(data))
      .catch((e) => console.log(e));
  });
});

router.post("/filter", (req, resp) => {
  const { priceTop, priceBottom, rate, level } = req.body;
  if (level === "all") {
    courses
      .find({
        price: { $lt: priceTop, $gt: priceBottom },
        rate: rate,
      })
      .then((data) => {
        return resp.json(data);
      })
      .catch((e) => console.log(e));
  } else if (rate == 0) {
    courses
      .find({
        price: { $lt: priceTop, $gt: priceBottom },
        level: level,
      })
      .then((data) => {
        return resp.json(data);
      })
      .catch((e) => console.log(e));
  } else if (level === "all" && rate == 0) {
    courses
      .find({
        price: { $lt: priceTop, $gt: priceBottom },
      })
      .then((data) => {
        return resp.json(data);
      })
      .catch((e) => console.log(e));
  } else {
    courses
      .find({
        price: { $lt: priceTop, $gt: priceBottom },
        rate: rate,
        level: level,
      })
      .then((data) => {
        return resp.json(data);
      })
      .catch((e) => console.log(e));
  }
});

router.get("category/:cat", (req, resp) => {
  courses
    .find({ category: req.params.cat })
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.get("/courses", pagination(courses), (req, resp) => {
  resp.json(resp.paginationResult);
});

router.post("/getCourse/:id",verifyCourse, (req, resp) => {
  courses
    .findById(req.params.id)
    .then((data) => resp.json(data))
    .catch((e) => console.log(data));
});

router.get("/popular", (req, resp) => {
  courses
    .find()
    .sort("-number_of_students")
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});


router.get("/search",(req,resp)=>{
  const course = req.query.title
  const coursereg = new RegExp(course,"gi")
  courses.find({title:coursereg})
  .then(data => resp.json(data))
  .catch(e => console.log(e))
})
module.exports = router;
