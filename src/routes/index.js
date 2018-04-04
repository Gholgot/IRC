//_________________ Requires ___________

var irc = require('../config/require');
var path = require('path');
var config = require(path.resolve('src/config/config'));


//_________________ Routes _____________


module.exports = function (routing) {
    //________ CSS & JS _________
    routing.use("/css", irc.express.static(path.resolve('public/assets/css/')));
    routing.use("/js", irc.express.static(path.resolve('public/assets/js/')));
    routing.use('/img', irc.express.static(path.resolve('public/assets/img/')));

    //________ Main MiddleWare _____

    routing.use(function (req, res, next) {
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
    })
    //________ Entity ___________
    require('./user')(routing);
    require('./message.js')(routing);
    require('./room')(routing);
    require('./modal')(routing);
}


