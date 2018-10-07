

/* GET home page. */
exports.index = ((req, res, next) => {
  res.render('index', { title: 'Express', csrfToken: req.csrfToken() });
});
