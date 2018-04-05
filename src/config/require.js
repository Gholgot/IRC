var config = require('./config');
var express = require('express');  
var app = express();  
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var socket = io;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var base64url = require('base64url');
var path = require('path');



module.exports = {
    'config': config,
    'mongoose': mongoose,
    'express': express,
    'server': server,
    'app': app,
    'io': io,
    'socket': socket,
    'bodyParser': bodyParser,
    'jwt': jwt,
    'base64url': base64url,
    "path": path
}