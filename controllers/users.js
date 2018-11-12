const User = require('../models/user').model;

exports.getUser = ((req, res) => {
  User.findOne(null, (err, userInfo) => {
    res.send(JSON.stringify(userInfo));
  })
});

exports.newuser = ((req, res, next) => {
  console.log("Got something");
  res.send('respond with a resource');
});