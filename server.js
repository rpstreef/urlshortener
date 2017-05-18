'use strict';

const PORT = 3000;

import {join} from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import ReactEngine from 'react-engine';
import routes from './public/routes.jsx';
import config from './config.json';
import api from './api';
import jsonServer from 'json-server';
// import bijection from './api/services/bijection.js'
import bijection from 'bijective-shortener';
import request from 'request-promise';
var https = require('https');
var fs = require('fs');

let sslOptions = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.pem')
};
let app = express();

// allow cross origin requests
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

// Must be placed first, so we have payload(!)
app.use(bodyParser.json({
	limit : config.bodyLimit
}));
app.use(bodyParser.urlencoded({ extended: false }));

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({
  routes: routes,
  routesFilePath: join(__dirname, '/public/routes.jsx'),
  performanceCollector: function(stats) {
    console.log(stats);
  }
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', join(__dirname, '/public/views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', ReactEngine.expressView);

// expose public folder as static assets
app.use(express.static(join(__dirname, '/public')));

app.use(favicon(join(__dirname, '/public/favicon.ico')));

// access json-server api here
app.use('/api', api({ config }));
app.use('/db', jsonServer.router('db.json'));

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// add our app routes
app.get('/', function(req, res) {
  res.render(req.url);
});

// add our app routes
app.get('/:encoded_id', function(req, res) {
    var encodedId = req.params.encoded_id;
    console.log("encodedId: " + encodedId);
    var id = bijection.decodeToInteger(encodedId);
    console.log("ID: " + id);
  	// check if url already exists in database
		request.get({ url: "https://localhost:" + config.port + "/db/url/?id=" + id, rejectUnauthorized: false})
		.then(function (resp) {
        let parsed = JSON.parse(resp);
        if(parsed.length) {
          res.redirect(parsed[0].url);
        } else {
          res.redirect("https://localhost:" + config.port);
        }
		});
});

app.use(function(err, req, res, next) {
  console.error(err);

  // http://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err);
  }

  if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
    return res.redirect(302, err.redirectLocation);
  }
  else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
    return res.status(404).render(req.url);
  }
  else {
    // for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
    // any other error we just send the error message back
    return res.status(500).render('500.jsx', {
      err: {
        message: err.message,
        stack: err.stack
      }
    });
  }
});

https.createServer(sslOptions, app).listen(3000)

/*
const server = app.listen(PORT, function() {
  console.log('Example app listening at http://localhost:%s', PORT);
});*/