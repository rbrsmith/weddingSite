var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var pwd = req.body.pwd;
  if(pwd === "foobar") {
    res.sendFile("index.html", { root: './views/' });
  } else {
    res.sendFile("error.html", {root: './views/'});
  }
});

router.get("/", function(req,res) {
    res.sendFile("login.html", {root: "./views/"});
});

module.exports = router;
