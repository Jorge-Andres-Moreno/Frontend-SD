#!/usr/bin/env node

// Declare our dependencies
var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');

//Defined IP backend
var backendHost = process.env.BACKEND || '127.0.0.1';

//Define PORT
var port = process.env.PORT || 80;

//Initialize express
var app = express();

//Define parse of objects that are receive and send
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Set the view engine to use EJS as well as set the default views directory
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//METHOD GET"/"" return index.html file and consult list of users
app.get('/', function (req, res) {
    console.log('GET="/"');
    request.get('http://' + backendHost + ':8080/users')
        .end(function (err, data) {
            if (data == undefined) {
                res.status(404).send({});
            } else {
                if (data.status != 200) {
                    res.send(data.status, 'We have an bug');
                } else {
                    res.render('index', data.body);
                }
            }
        })
});

//METHOD POST"/"" return index.html file and consult list of users
app.post('/', function (req, res) {
    console.log('POST="/"');
    //console.log(req.body)
    request.post('http://' + backendHost + ':8080/user/add')
        .end(function (err, data) {
            if (data == undefined) {
                res.status(404).send({});
            } else {
                if (data.status != 200) {
                    res.send(data.status, 'We have an bug');
                } else {
                    request.get('http://' + backendHost + ':8080/users')
                        .end(function (err, data) {
                            if (data == undefined) {
                                res.status(404).send({});
                            } else {
                                if (data.status != 200) {
                                    res.send(data.status, 'We have an bug');
                                } else {
                                    res.render('index', data.body);
                                }
                            }
                        })
                }
            }
        })
});

app.get('/add', function (req, res) {
    console.log('GET="/add"');
    res.render('add');
});

module.exports = app.listen(port);