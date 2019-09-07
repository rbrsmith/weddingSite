var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pwdHash = '$2b$10$Q4vqTnoUnINra/fEQio3zepBpBgKve04o8cbT5Erc5t1mzY6V/UQy';

/* GET home page. */
router.post('/', function(req, res, next) {


  if(typeof req.body.pwd !== 'undefined') {

      req.session.pwd = req.body.pwd;

    bcrypt.hash("Rosolyn", 10, function(err, hash) {
        console.log(hash);
    })


      bcrypt.compare(req.session.pwd, pwdHash, function(err, result) {
        if(result) {
          console.log("Getting session name: " + req.session.name);
          const name = (req.session.name) ? req.session.name : undefined;

          //   res.sendFile("index.html", { root: './views/' });
          res.render("indexPage", {name: name});

        } else {

          console.log("Sending error");
          console.log(err);
          res.sendFile("error.html", { root: './views/' });
        }



      // if(typeof req.session.pwd !== 'undefined' &&
      //     req.session.pwd === pwdHash) {
      //
      //   console.log("Getting session name: " + req.session.name);
      //   const name = (req.session.name) ? req.session.name : undefined;
      //
      //   //   res.sendFile("index.html", { root: './views/' });
      //   res.render("indexPage", {name: name});
      // } else {
      //   console.log("Sending error");
      //   res.sendFile("error.html", { root: './views/' });
      // }
    });

  }

});

router.get('/', function(req, res, next) {
  bcrypt.compare(req.session.pwd, pwdHash, function(err, result) {
    if (result) {

      console.log("Getting session name: " + req.session.name);

      const name = (req.session.name) ? req.session.name : undefined;

      //res.sendFile("index.html", { root: './views/' });
      res.render("indexPage", {name: name});
    } else {
      console.log("Sending error");
      res.sendFile("error.html", {root: './views/'});
    }
  });

});


module.exports = router;
