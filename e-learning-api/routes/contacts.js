const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const contacts = require("../models/contacts");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "santal.project10@gmail.com",
    pass: "santal123456",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.get("/", (req, resp) => {
  contacts
    .find()
    .then((data) => resp.json(data))
    // .then(data => {console.log(data);notifyUser()})
    .catch((e) => console.log(e));
});

router.get("/approved", (req, resp) => {
  contacts
    .find({ approve: 1 })
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

router.post("/", (req, resp) => {
  const { full_name, email, message } = req.body;

  if (!full_name || !email || !message)
    resp.status(400).json({ error: "missing fields" });

  const mailOptions = {
    from: "Tunacademy@gmail.com",
    to: "firas.bouali11@gmail.com",
    subject: "Contact - "+full_name,
    text: message,
  };
  const contact = new contacts({
    full_name,
    email,
    message,
  });

  contact
    .save()
    .then((data) => {
      resp.json(data);
    })
    .catch((e) => console.log(e));
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.delete("/:id", (req, resp) => {
  contacts
    .remove({ _id: req.params.id })
    .then((data) => resp.json(data))
    .catch((e) => resp.status(422).json({ error: e }));
});

router.delete("/", (req, resp) => {
  const { id } = req.body;
  contacts
    .remove({ _id: id })
    .then((data) => resp.json(data))
    .catch((e) => resp.status(422).json({ error: e }));
});

router.patch("/approve", (req, resp) => {
  const { id } = req.body;
  contacts
    .updateOne(
      { _id: id },
      {
        $set: { approve: 1 },
      }
    )
    .then((data) => resp.json(data))
    .catch((e) => console.log(e));
});

module.exports = router;
