var express = require('express');
const mongo = require('mongodb').MongoClient
var router = express.Router();
var moment = require("moment");
var timestamp = moment().format('YYYY-MM-DD:hh:mm:ss');

router.options("/", function(req, res, next) {
   console.log(timestamp + ": rsv OPTIONS req");
   console.log(timestamp  + ": Setting session name" + req.body.name);

   var allowedOrigins = ['http://rosolynwedding.com:3000', 'http://www.rosolynwedding.com:3000','http://www.rosolynwedding.com', 'http://rosolynwedding.com'];
   var origin = req.headers.origin;
   console.log(timestamp + ": origin: " + origin);

   if(allowedOrigins.indexOf(origin) > -1){
      console.log(timestamp + ": Setting header");
      res.setHeader('Access-Control-Allow-Origin', origin);
   }

   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
   res.setHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
   res.setHeader("Access-Control-Max-Age", "86400");

   console.log(timestamp +": Sending success");
   res.send(JSON.stringify({
      status:"success"
   }));

});


router.post("/", function(req, res, next) {
   console.log(timestamp + ": rsvp POST req");
   console.log(timestamp + ": Setting session name" + req.body.name);

   req.session.name = req.body.name;
   var allowedOrigins = ['http://rosolynwedding.com:3000', 'http://www.rosolynwedding.com:3000','http://www.rosolynwedding.com', 'http://rosolynwedding.com'];
   var origin = req.headers.origin;
   console.log(timestamp + ": origin: " + origin);

   if(allowedOrigins.indexOf(origin) > -1){
      console.log(timestamp + ": Setting header");
      res.setHeader('Access-Control-Allow-Origin', origin);
   }

   console.log(timestamp + ": Sending success");
   res.send(JSON.stringify({
      status:"success"
   }));

});
module.exports = router;
