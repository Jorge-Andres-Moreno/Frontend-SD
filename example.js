#!/usr/bin/env node

// Declare our dependencies
var express = require('express');
var request = require('superagent');
var port = process.env.PORT || 8443;
//var backendHost = process.env.BACKEND;

// Create our express app
var app = express();

// Set the view engine to use EJS as well as set the default views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views/');

// This tells Express out of which directory to serve static assets like CSS and images
app.use(express.static(__dirname + '/public'));

// The homepage route of our application does not interface with the MovieAnalyst API and is always accessible. We won’t use the getAccessToken middleware here. We’ll simply render the index.ejs view.
app.get('/', function(req, res){
  res.render('index');
})

// For the movies route, we’ll call the getAccessToken middleware to ensure we have an access token. If we do have a valid access_token, we’ll make a request with the superagent library and we’ll be sure to add our access_token in an Authorization header before making the request to our API.
// Once the request is sent out, our API will validate that the access_token has the right scope to request the /movies resource and if it does, will return the movie data. We’ll take this movie data, and pass it alongside our movies.ejs template for rendering
app.get('/buycars', function(req, res){
  request
    .get('http://'+backendHost+':8080/buycars')
    .end(function(err, data) {
      if(data==undefined){
        res.status(404).send({});
      } else {
        if(data.status == 403){
          res.send(403, '403 Forbidden');
        } else {
          var buy = data.body;
          res.render('buycars', { buy: buy} );
        }
      }
    })
})

// The process will be the same for the remaining routes. We’ll make sure to get the acess_token first and then make the request to our API to get the data.
// The key difference on the authors route, is that for our client, we’re naming the route /authors, but our API endpoint is /reviewers. Our route on the client does not have to match the API endpoint route.
app.get('/vehicles', function(req, res){
  request
    .get('http://'+backendHost+':8080/vehicles')
    .set('Authorization', 'Bearer ' + req.access_token)
    .end(function(err, data) {
      if(data==undefined){
        res.status(404).send({});
      } else {
        if(data.status == 403){
          res.send(403, '403 Forbidden');
        } else {
          var vehicles = data.body;
          res.render('vehicles', {vehicles : vehicles});
        }
      }
    })
})

app.get('/support', function(req, res){
  request
    .get('http://'+backendHost+':8080/support')
    .end(function(err, data) {
      if(data==undefined){
        res.status(404).send({});
      } else {
        if(data.status == 403){
          res.send(403, '403 Forbidden');
        } else {
          var support = data.body;
          res.render('support', {support : support});
        }
      }
    })
})

// We’ve added the pending route, but calling this route from the MovieAnalyst Website will always result in a 403 Forbidden error as this client does not have the admin scope required to get the data.

//Se obtiene la data del servidor backend y se genera un array de requests json que contiene las 3 necesarias para el modulo

app.get('/experience', function(req, res){
  var exp = [];
  request
    .get('http://'+backendHost+':8080/publicidad')
    .end(function(err, data) {
      if(data==undefined){
        return;
      } else {
        if(data.status == 403){
          res.send(403, '403 Forbidden');
        }else{
          var publicidad = data.body;
          exp[0] = publicidad;
          if(!(typeof exp[1] == 'undefined') && !(typeof exp[2] == 'undefined')){
            res.render('experience', {exp : exp});
          }
        }
      }    
    })
    request
    .get('http://'+backendHost+':8080/innovacion')
    .end(function(err, data) {
      if(data==undefined){
        return;
      } else {
        if(data.status == 403){
          res.send(403, '403 Forbidden');
        }else{
          var innovacion = data.body;
          exp[1] = innovacion;
          if(!(typeof exp[0] == 'undefined') && !(typeof exp[2] == 'undefined')){
            res.render('experience', {exp : exp});
          }
        }
      }
    })

    request
    .get('http://'+backendHost+':8080/redsocial')
    .end(function(err, data) {
      if(data==undefined){
        res.status(404).send({});
        return;
      } else {
        if(data.status == 403){
          res.send(403, '403 Forbidden');
        }else{
          var redsocial = data.body;
          exp[2] = redsocial;
          if(!(typeof exp[1] == 'undefined') && !(typeof exp[0] == 'undefined')){
            res.render('experience', {exp : exp});
          }
        }
      }
    })
})

module.exports = app.listen(port);