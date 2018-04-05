//_________________ Requires ___________

var path = require('path');
var irc = require('../config/require');

var model = require(path.resolve("./src/model/user"));
var controller = require(path.resolve("./src/controller/user"));


//_________________ Routes _____________


module.exports = function(routing) {
    routing.post("/api/user/login",controller.anonymousRequired, controller.login);
    
    routing.post("/api/user/register",controller.anonymousRequired, controller.register);

    routing.post("/api/token_verify/", controller.token_verify);
}