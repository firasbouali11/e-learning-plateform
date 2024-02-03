const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const contacts = require("./routes/contacts");
const comments = require("./routes/comments");
const courses = require("./routes/courses");
const categories = require("./routes/categories")
const users = require("./routes/users")
const teachers = require("./routes/teachers")
const cart = require("./routes/cart");
const chapters = require("./routes/chapters");

const app = express();
const port = 5555;

mongoose.connect(
  "mongodb+srv://root:root@cluster0.lg6nx.mongodb.net/root?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);



mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("error: ", err);
});

app.use(cors())
app.use(express.json());
app.use("/contacts", contacts);
app.use("/comments", comments);
app.use("/courses", courses);
app.use("/categories", categories);
app.use("/users", users);
app.use("/teachers", teachers);
app.use("/cart", cart);
app.use("/chapters", chapters);

app.listen(port, () => {
  console.log("the server is running on ", port);
});
