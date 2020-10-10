const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Route Imports
const studentRouter = require('./routes/student.routes');

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
    useFindAndModify: true
})
.then(() => console.log('Connected to DB.'))
.catch(e => console.error(e.message));

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
