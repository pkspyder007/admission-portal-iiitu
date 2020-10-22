const { createAdmin } = require("./controllers/admin.controller.js");

exports.seedAdmin = () => {
	const admin = {
		email: "admin@iiitu.ac.in"
	}

	createAdmin(admin);
}