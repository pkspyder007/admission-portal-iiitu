const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const winston = require('winston');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'server-log')
});

const { seedAdmin } = require("./seedAdmin");

// Route Imports
const studentRouter = require('./routes/student.routes');
const uploadRouter = require('./routes/upload.routes');

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.static(path.join(__dirname, 'uploads')));

// setup the logger
morgan.token('authToken', function (req, res) { return req.headers['x-access-token'] })
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" "acess-token :authToken"', { stream: accessLogStream }))

// Routers
app.use('/api/student', studentRouter);
app.use('/api/document', uploadRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Connected to DB.')
    // seedStudents();
    seedAdmin();
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
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log', handleExceptions: true })
  ]
});

process.on('uncaughtException', function (exception) {
  console.log(exception);
});

