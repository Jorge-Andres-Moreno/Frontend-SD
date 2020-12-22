#!/usr/bin/env node

// Declare our dependencies
var express = require("express");
var request = require("superagent");
var bodyParser = require("body-parser");

//Defined IP backend
var backendHost = process.env.IP_BACKEND || "test-talentun.ddns.net";

var portBackend = process.env.PORT_BACKEND || 8080;

//Define PORT
var port = process.env.PORT_FRONTEND || 80;

//Initialize express
var app = express();

//Define parse of objects that are receive and send
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to use EJS as well as set the default views directory
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//METHOD GET"/"" return index.html file and consult list of users
app.get("/", function (req, res) {
  console.log('GET="/"');
  request
    .get("http://" + backendHost + ":"+portBackend+"/users/list")
    .end(function (err, data) {
      if (data == undefined) {
        res.render("index", {users:[]});
      } else {
        if (data.status == 403) {
          res.send(data.status, "We have an bug");
        } else {                   
          res.render("index", data.body);
        }
        return;      
      }
      res.render("index", {users:[]});
    });
});

//METHOD POST"/"" return index.html file and consult list of users
app.post("/add", function (req, res) {
  console.log('POST="/add"');
  //console.log(req.body)
  request
    .put("http://" + backendHost + ":"+portBackend+"/users/add")
    .send(req.body)
    .end(function (err, data) {
      if (data == undefined) {
        res.status(404).send({});
      } else {
        if (data.status == 403) {
          res.send(data.status, "We have an bug");
        } else {
          request
            .get("http://" + backendHost + ":"+portBackend+"/users/list")
            .end(function (err, data) {
              if (data == undefined) {
                res.status(404).send({});
              } else {
                if (data.status != 200) {
                  res.send(data.status, "We have an bug");
                } else {
                  res.render("index", data.body);
                }
              }
            });
        }
      }
    });
});

//METHOD POST"/"" return index.html file and consult list of users
app.post("/user/delete", function (req, res) {
  console.log('POST="/user/delete"');  
  request
    .delete("http://" + backendHost + ":"+portBackend+"/users/delete")
    .send(req.body)
    .end(function (err, data) {     
          request
            .get("http://" + backendHost + ":"+portBackend+"/users/list")
            .end(function (err, data) {
              if (data == undefined) {
                res.status(404).send({});
              } else {
                if (data.status != 200) {
                  res.send(data.status, "We have an bug");
                } else {
                  res.render("index", data.body);
                }
              }
            });       
    });
});

app.post("/user/update", function (req, res) {
  console.log('POST="/user/update"');  
  request
    .post("http://" + backendHost + ":"+portBackend+"/users/update")
    .send(req.body)
    .end(function (err, data) {     
          request
            .get("http://" + backendHost + ":"+portBackend+"/users/list")
            .end(function (err, data) {
              if (data == undefined) {
                res.status(404).send({});
              } else {
                if (data.status != 200) {
                  res.send(data.status, "We have an bug");
                } else {
                  res.render("index", data.body);
                }
              }
            });       
    });
});

app.get("/add", function (req, res) {
  console.log('GET="/add"');
  res.render("add");
});

module.exports = app.listen(port);
