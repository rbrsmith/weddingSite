var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  if(typeof req.body.pwd !== 'undefined') {
    req.session.pwd = req.body.pwd;
  }

  if(typeof req.session.pwd !== 'undefined' &&
      req.session.pwd === 'foobar') {

      console.log("Getting session name: " + req.session.name);
      const name = (req.session.name) ? req.session.name : undefined;

   //   res.sendFile("index.html", { root: './views/' });
      res.render("indexPage", {name: name});
  } else {
    console.log("Sending error");
      res.sendFile("error.html", { root: './views/' });
  }
});

router.get('/', function(req, res, next) {
  if(typeof req.session.pwd !== 'undefined' &&
      req.session.pwd === 'foobar') {

    console.log("Getting session name: " + req.session.name);

    const name = (req.session.name) ? req.session.name : undefined;

    //res.sendFile("index.html", { root: './views/' });
    res.render("indexPage", {name: name});
  } else {
    console.log("Sending error");
    res.sendFile("error.html", { root: './views/' });
  }

});


module.exports = router;
