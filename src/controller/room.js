//_________________ Requires ___________

var irc = require('../config/require');
var path = require('path');
var config = require(path.resolve('src/config/config'));

var model = require(path.resolve("./src/model/room"));

//________________ Export ______________

exports.register_keys = {
    "name": "name",
    "password": "password",
    "description": "description",
    "admin": "admin"
}

    //.....................; MiddleWare ;.............
// This MiddleWare is used to check if the user is connected
exports.authCheck = function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        irc.jwt.verify(req.headers.authorization, config.jwt.secret, function (err, token) {
            if (err) {
                req.auth = false;
                next();
            } else {
                req.auth = true;
                next();
            }
        });
    } else {
        req.auth = false;
        next();
    }
}

// This function is used to as a middleware to check if the user is logged in or not
exports.loginRequired = function (req, res, next) {
    if (req.auth == true) {
        next();
    } else {
        res.json({ message: "Please login first !", bool: false });
    }
};

// This MiddleWare is used to check is the user is anonymous
exports.anonymousRequired = function(req, res, next) {
    if (req.auth == false) {
        next();
    } else {
        res.json({message: "This request is for non logged users only."});
    }
}

    //.................; Verify ;.........

// This function is used to verify user's inputs
exports.add_verify = function(inputs) {
    var errors = [];
    if (inputs.length == 0  || inputs.length == undefined) {
        Object.keys(inputs).forEach(function (input) {
            if (exports.register_keys[input] == undefined || inputs[input].length == 0) {
                errors.push("Your " + input + " isn't valid, please verify it.");
            }
        });
    } else {
        errors.push("You must send inputs in order to add a new room");
    }
    if (inputs.password != inputs.password_confirm) {
        errors.push("Password aren't matching, please check again.");
    }
    errors = (errors.length > 0) ? errors : true;
    return errors;
}   


    //.................; CRUD ;...........

// This function is used to add a new room into the DB
exports.add = function (req, res) {
    var validation = exports.add_verify(req.body);
    if(validation != true) {
        res.json(validation);
    } else {
        model.find({ name: req.body.name }, function (err, room) {
            if (room.length > 0) {
                res.json({ message: "This room's name is already taken.", bool: false})
            } else {
                var user = new model(req.body);
                user.save();
                res.json({ message: "Room created", bool: true });
            }
        })
    }
}

// This function is used to remove a room from the DB
exports.delete = function (req, res) {
    if (req.query.name) {
        model.find({ name: req.query.name}, function(err, room) {
            if(err) {
                res.send({ message: err, bool: false});
            }
            if(room.length != undefined) {
                model.remove({ name: req.query.name}, function(err, room) {
                    if(err) {
                        res.send({ message: err, bool: false});
                    } else {
                        res.send({ message: "The room has been deleted", bool: true});
                    }
                })
            }
        })
    } else {
        res.json({ message: "Invalid parameter. Please check again.", bool: false })
    }
}
 