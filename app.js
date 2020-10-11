const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const winston = require('winston');


// Route Imports
const studentRouter = require('./routes/student.routes');
const { createStudent } = require('./controllers/student.controller');

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routers
app.use('/api/student', studentRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(() => console.log('Connected to DB.'))
.catch(e => console.error(e.message));

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));


 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log', handleExceptions: true })
  ]
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

const tempStd = {
    name: 'Praveen Kumar',
    regNo: '',
    jeeRegNo: '1234566',
    email: 'pkspyder007@gmail.com',
    mobile: '9634049244',
    category: 'Sc',
    fatherName: 'GP Singh',
    branchAlloted: 'CSE',
    fessPaid: 20000,
    password: ''
}
// createStudent(tempStd);