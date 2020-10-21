const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const winston = require('winston');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'server-log')
})


// Route Imports
const studentRouter = require('./routes/student.routes');
// const adminRouter = require('./routes/admin.routes');
const uploadRouter = require('./routes/upload.routes');
const { createStudent } = require('./controllers/student.controller');
const { createAdmin } = require('./controllers/admin.controller');

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.use(express.static(path.join(__dirname, 'admin', 'build')));
app.use(express.static(path.join(__dirname, 'uploads')));

// setup the logger
morgan.token('authToken', function (req, res) { return req.headers['x-access-token'] })
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" "acess-token :authToken"', { stream: accessLogStream }))

// Routers
app.use('/api/student', studentRouter);
app.use('/api/document', uploadRouter);
// app.use('/api/admin', adminRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Connected to DB.')
    // const tempStd = {
    //   name: 'Praveen Kumar',
    //   regNo: '',
    //   jeeRegNo: '1234',
    //   email: '19137@iiitu.ac.in',
    //   mobile: '9634049244',
    //   category: 'Sc',
    //   fatherName: 'GP Singh',
    //   branchAlloted: 'CSE',
    //   fessPaid: 20000,
    //   password: ''
    // }

    // for (let i = 0; i < 100; i++) {
    //   tempStd.regNo = i + 1;
    //   tempStd.jeeRegNo = `tempStd.jeeRegNo${i}`;
    //   if (i % 3 == 0)
    //     tempStd.branchAlloted = "IT"
    //   if (i % 5 == 0)
    //     tempStd.branchAlloted = "ECE"
    //   createStudent(tempStd)
    // }
  })
  .catch(e => console.error(e.message));


app.get("/admin/", (req, res) => {
  console.log('admin');
  res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

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

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
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

const tempAd = {
  email: "admin@iiitu.ac.in",
}

createAdmin(tempAd);