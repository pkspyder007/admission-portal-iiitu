const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const adminRouter = require("./routes/admin.routes");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'admin', 'build')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Connected to DB.')
  	app.listen(3500, () => console.log('serving admin on port 3500'));
  })
  .catch(e => console.error(e.message));

app.use("/api/admin", adminRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
});