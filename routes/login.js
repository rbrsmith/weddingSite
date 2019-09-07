var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pwdHash = '$2b$10$LdDSPZpMeaSDZA8XL4zzQOmz00hQgmqQcpnU5oK24Q8uqNtyQQjMm';

/* GET home page. */
router.get('/', function(req, res, next) {

  bcrypt.compare(req.session.pwd, pwdHash, function(err, result) {
    if (result) {

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
});

module.exports = router;
