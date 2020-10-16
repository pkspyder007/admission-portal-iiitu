const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'admin', 'build')));

app.get("*", (req, res) => {
  console.log('admin');
  res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
})

app.listen(3500, () => console.log('serving admin'));
