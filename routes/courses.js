const express = require("express");
const Joi = require("joi");

const router = express.Router();

const courses = [
  { id: 1, title: "matematicas" },
  { id: 2, title: "sociales" },
];

const schema = Joi.object({
  title: Joi.string().min(4).required(),
});

// Helper functions
const getCourse = (id) => {
  return courses.find((c) => c.id === parseInt(id));
};

const validateSchema = (body) => {
  return schema.validate(body);
};

// routes
router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = getCourse(req.params.id);

  if (!course) {
    res.status(404).send("No course found");
    return;
  }
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    title: req.body.title,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) {
    res.status(404).send("No course found");
    return;
  }
  const { error } = validateSchema(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.title = req.body.title;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) {
    res.status(404).send("No course found");
    return;
  }
  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

module.exports = router;
