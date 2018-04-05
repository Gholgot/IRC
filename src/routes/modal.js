//_________________ Requires ___________

var irc = require('../config/require');
var path = require('path');


//_________________ Routes _____________


module.exports = function(routing) {

    routing.get("/modal/:name", function(req, res, next){
        res.sendFile(path.resolve("public/views/modal/" + req.params.name + ".html"));
    })
  
}
