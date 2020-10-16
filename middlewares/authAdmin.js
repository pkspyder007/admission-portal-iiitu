var jwt = require('jsonwebtoken');
require("dotenv").config();

function verifyAdminToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.ADMIN_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err.message, token);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    };
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyAdminToken;