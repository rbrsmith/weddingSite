var express = require('express');
var router = express.Router();
var ps = require('ps-node');

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

        res.render("statusPage", {mongo: mongoStatus});
    });


});

module.exports = router;
