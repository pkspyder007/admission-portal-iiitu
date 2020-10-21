const { createStudents } = require("./controllers/student.controller.controller.js");

const std = {
	email: "admin@iiitu.ac.in"
}

createStudents(std);