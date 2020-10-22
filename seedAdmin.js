const { createAdmin } = require("./controllers/admin.controller.js");

export.seedAdmin = () => {
	const admin = {
		email: "admin@iiitu.ac.in"
	}

	createAdmin(admin);
}