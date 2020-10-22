const { createStudent } = require("./controllers/student.controller.js");


exports.seedStudents = () => {

	const tempStd = {
		  name: 'Praveen Kumar',
		  regNo: '',
		  jeeRegNo: '1234',
		  email: '19137@iiitu.ac.in',
		  mobile: '9634049244',
		  category: 'Sc',
		  fatherName: 'GP Singh',
		  branchAlloted: 'CSE',
		  fessPaid: 20000,
		  password: ''
		}
	createStudent(tempStd);
}