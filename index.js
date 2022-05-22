const Joi = require("joi");
const express = require("express");
const app = express();
//middleware
app.use(express.json());
const courses = [
  {
    id: 1,
    name: "Srijan",
    info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos et sint odio, praesentium rerum voluptatibus dolor nihil voluptates dolorem nisi illum magni exercitationem quaerat similique, officia aspernatur soluta incidunt voluptatum eius maxime. Mollitia esse perspiciatis fugiat, consectetur ipsa vero itaque.",
  },
  {
    id: 2,
    name: "Rahul",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ut eos et eum cum cupiditate unde! Recusandae nesciunt eum ut.",
  },
  {
    id: 3,
    name: "Rohit",
    info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, impedit distinctio sunt voluptatum perferendis corporis soluta quam possimus corrupti, neque rem velit autem ut! Fuga qui vel ad saepe error corporis adipisci sequi libero.",
  },
];

app.get("/", (req, res) => {
  res.send("hellow world");
});
app.get("/api/srijanAPI", (req, res) => {
  res.send(courses);
});
app.get("/api/srijanAPI/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); //bydefault it returns a string therefore converting it into an integer
  //404 error for not found
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  else res.send(course);
});

app.post("/api/srijanAPI", (req, res) => {
  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  //   //input validation using Joi:
  //   const schema = Joi.object({
  //     name: Joi.string().min(3).required(),
  //   });
  //   const result = schema.validate(req.body);

  //   //   /const result = Joi.validate(req.body, schema);
  //   console.log(result);
  //input validation Manually :
  //   if (!req.body.name || req.body.name.length < 3) {
  //     //400 Bad request
  //     res
  //       .status(400)
  //       .send("Name is a required field and should be of minimum 3 characters");
  //     return;
  //   }
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name, //Here we are asuming that the user has entered the name correctly and is not empty
  };
  courses.push(course);
  res.send(course);
});
app.put("/api/srijanAPI/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  //update
  course.name = req.body.name;
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(`${port}`, () => console.log(`server is running on port ${port}`));

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

app.delete("/api/srijanAPI/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
