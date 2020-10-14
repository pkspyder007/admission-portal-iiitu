//Required package
var pdf = require("pdf-creator-node");
var fs = require('fs');
const path = require('path')

// Read HTML Template
var html = fs.readFileSync(path.join(__dirname, 'admit-card-template.html'), 'utf8');

var options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">IIIT UNA</div>'
  },
  "footer": {
    "height": "28mm",
    "contents": {
      first: 'Cover page'
    }
  }
};

var document = {
  html: html,
  data: {
    name: 'Praveen Kumar',
    fname: 'G.P.Singh',
    regNo: '2k20CSE002',
    school: "School of Computing",
    branch: 'CSE',
    regData: '20-09-2020'
  },
  path: "./output.pdf"
};

pdf.create(document, options)
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  });