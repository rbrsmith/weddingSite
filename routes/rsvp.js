var express = require('express');
const mongo = require('mongodb').MongoClient
var router = express.Router();

const url = 'mongodb://localhost:27017'

/* GET home page. */
router.post('/', function(req, res, next) {
  var body = req.body;
  console.log(body);

  var rsvpname = req.body.rsvpname;
  var joiningfor = req.body.joiningfor;
  var accomadation= req.body.accomadation;

  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }

    const db = client.db('WEDDING');
    const collection = db.collection('RSVP');
    collection.insertOne(
        {
          name: rsvpname,
          joiningfor: joiningfor,
          accomadation: accomadation
        },

        (err, result) => {
          if(err) {
            console.log(err);
          }
          res.sendFile("rsvp.html", {root: "./views/"});
        }
     );


  });



});

/*router.get("/", function(req,res) {
    res.sendFile("login.html", {root: "./views/"});
});
*/
module.exports = router;
