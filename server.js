//______________ Require ____________

var irc = require('./src/config/require');

//________________ Global Var ________

var URL = "mongodb://localhost/my_irc";

//________________ App Concern ________

irc.app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

irc.app.use(irc.bodyParser.json());
irc.app.use(irc.bodyParser.urlencoded({ extended: false }));

//__________________ Routes ___________

var routing = irc.express.Router();
require('./src/routes/index')(routing);
irc.app.use('/', routing);


//________________ Functions ___________

irc.io.use(function (socket, next) {
    if (!socket.handshake || !socket.handshake.query.token) {
        socket.user = {
            username: 'anonymous'
        }
        next();
    } else {
        socket.user = irc.jwt.decode(socket.handshake.query.token, 'ircWaC');
        console.log(socket.user);
    }
});

irc.io.on('connection', function (socket) {
    console.log(Date() + " : " + socket.user.username, "is connected.");
    irc.socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    irc.socket.on('chat', function (msg) {
        irc.socket.broadcast.emit('chat', msg);
    });
});

irc.mongoose.connect(URL, function (error) {
    if (error) {
        console.log("Mongo Error :", error);
    } else {
        console.log('Connected to Mongo Serve');
    }
});

irc.server.listen(8887, '0.0.0.0');


