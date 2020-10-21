const { createAdmin } = require("./controllers/admin.controller.js");

const admin = {
	email: "admin@iiitu.ac.in"
}

createAdmin(admin);