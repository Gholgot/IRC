//_________________ Requires ___________

var irc = require('../config/require');
var path = require('path');
var config = require(path.resolve('src/config/config'));

var model = require(path.resolve("./src/model/user"));

//________________ Export ______________

exports.register_keys = {
    "name": "name",
    "surname": "surname",
    "username": "username",
    "email": "email",
    "dob": "dob",
    "password": "password",
    "password_confirm": "password_confirm",
    "description": "description"
}
exports.login_keys = {
    "login": "login",
    "password": "password"
}

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

// This function is used to verify if the entered values into the register form are all correct
exports.register_verify = function (inputs) {
    var errors = [];
    if (Object.keys(inputs).length == 0) {
        errors.push('No data sent');
    } else {
        Object.keys(inputs).forEach(function (input) {
            if (exports.register_keys[input] == undefined || inputs[input].length == 0) {
                errors.push("Your " + input + " isn't valid, please verify it.");
            }
        });
    }
    if (inputs.password != inputs.password_confirm) {
        errors.push("Password aren't matching, please check again.");
    }
    if (errors.length != 0) {
        return errors;
    } else {
        return true;
    }
}

// This function is used to verify if the entered values into the loggin form are all correct
exports.login_verify = function (inputs) {
    var errors = [];
    if (Object.keys(inputs).length == 0 ) {
        errors.push('No data sent');
    } else {
        Object.keys(inputs).forEach(function (input) {
            if (exports.register_keys[input] == undefined || inputs[input].length == 0) {
                errors.push(input + " isn't valid, please verify it.");
            }
        });
    }
    if (errors.length != 0) {
        return errors;
    } else {
        return true;
    }
}

// This function is used to log the user into the DB
exports.login = function (req, res, next) {
    var validation = exports.login_verify(req.body);
    if (validation != true) {
        res.json({ message: validation, bool: false });
    } else {
        model.find({ username: req.body.username }, function (err, user) {
            if (user.length > 0) {
                if (req.body.password == user[0].password) {
                    var token = irc.jwt.sign({
                        user: user[0].toObject(),
                        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 168),
                    },
                        config.jwt.secret);
                    res.json({ message: "Connected !", bool: true, token: token });
                } else {
                    res.json({ message: "Wrong password, please try again" });
                }
            } else {
                res.json({ message: "User does not exists", bool: false });
            }
        })
    }
}

// This function is used to register a user into the DB
exports.register = function (req, res, next) {
    var validation = controller_user.register_verify(req.body);
    if (validation != true) {
        res.json({ message: validation, bool: false });
    } else {
        model.find({ username: req.body.username }, function (err, user) {
            if (user.length > 0) {
                res.json({ message: "User already exists", bool: false })
            } else {
                var user = new model(req.body);
                user.save();
                res.json({ message: "Account created", bool: true });
            }
        })
    }
}

// This function is used to verify the send token
exports.token_verify = function (req, res, next) {
    if(req.body != "" || req.body.length != 0) {
        
    } else {
        res.json({message: "Make sure you've sent me data", bool: false })
    }
}
 