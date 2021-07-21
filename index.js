const express = require("express");
const app_debug = require("debug")("app:general");
const config = require("config");
const morgan = require("morgan");

const courses = require("./routes/courses");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// other setup
app.use(express.static("public"));
app.use("/api/courses", courses);

app.get("/", (req, res) => {
  res.send("Home page");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started  ${config.get("app_name")} on port ${port}`);
});
