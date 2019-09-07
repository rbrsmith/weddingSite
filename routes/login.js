var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pwdHash = '$2b$10$Q4vqTnoUnINra/fEQio3zepBpBgKve04o8cbT5Erc5t1mzY6V/UQy';

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
