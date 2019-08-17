var express = require('express');
var router = express.Router();
var ps = require('ps-node');

function checkForRSVPSpring(mongoStatus, res) {

    ps.lookup({
        command: 'java',
        arguments: '.*rsvp.*jar',
    }, function(err, resultList ) {
        if (err) {
            throw new Error(err);
        }
        var springStatus = "DOWN";
        resultList.forEach(function (process) {
            if (process) {
                console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
                springStatus = "UP";
            }
        });


        res.render("statusPage", {mongo: mongoStatus, spring: springStatus});
    });
};


/* GET home page. */
router.get("/", function(req,res) {

    ps.lookup({
        command: 'mongod',
    }, function(err, resultList ) {
        if (err) {
            throw new Error(err);
        }
        var mongoStatus = "DOWN";
        resultList.forEach(function( process ) {
            if (process) {
                console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
                mongoStatus = "UP";
            }
        });

        checkForRSVPSpring(mongoStatus, res);

    });


});


module.exports = router;
