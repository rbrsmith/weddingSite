var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pwdHash = '$2b$10$Q4vqTnoUnINra/fEQio3zepBpBgKve04o8cbT5Erc5t1mzY6V/UQy';

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("Index POST req");

  if(typeof req.body.pwd !== 'undefined') {
      console.log("Got pwd in post");
      req.session.pwd = req.body.pwd;
      bcrypt.compare(req.session.pwd, pwdHash, function(err, result) {
        if(result) {
          console.log("Pwd matched!");
          console.log("Getting session name: " + req.session.name);
          const name = (req.session.name) ? req.session.name : undefined;
          console.log("Sending index page");
          res.render("indexPage", {name: name});

        } else {

          console.log("Sending error page");
          console.log(err);
          res.render("errorPage", {});
        }
    });

  }

});

router.get('/', function(req, res, next) {
  console.log("Index GET req");
  bcrypt.compare(req.session.pwd, pwdHash, function(err, result) {
    if (result) {

      console.log("Pwd matched!");
      console.log("Getting session name: " + req.session.name);

      const name = (req.session.name) ? req.session.name : undefined;

      console.log("Sending index page");
      res.render("indexPage", {name: name});
    } else {
      console.log("Sending error page");
      res.render("errorPage", {});
    }
  });

});


module.exports = router;
