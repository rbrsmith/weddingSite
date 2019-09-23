var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

var moment = require("moment");
var timestamp = moment().format('YYYY-MM-DD:hh:mm:ss');

const pwdHash = '$2b$10$Q4vqTnoUnINra/fEQio3zepBpBgKve04o8cbT5Erc5t1mzY6V/UQy';

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(timestamp + ": Login page requested");

  bcrypt.compare(req.session.pwd, pwdHash, function(err, result) {
    if (result) {

      console.log(timestamp + ": Getting session name: " + req.session.name);

      const name = (req.session.name) ? req.session.name : undefined;

      console.log(timestamp + ": Sending index page");
      res.render("indexPage", {name: name});

    } else {
        console.log(timestamp + ": Sending login page");
        res.render("loginPage", {});
    }
  });
});

module.exports = router;
