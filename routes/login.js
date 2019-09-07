var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(typeof req.session.pwd !== 'undefined' &&
    req.session.pwd === 'foobar') {

    console.log("Getting session name: " + req.session.name);

    const name = (req.session.name) ? req.session.name : undefined;

    //res.sendFile("index.html", { root: './views/' });
    res.render("indexPage", {name: name});

//    res.sendFile("index.html", { root: './views/' });
  } else {
    //res.render('index', { title: 'Express' });
    res.sendFile("login.html", {root: "./views/"});
  }
});

module.exports = router;
