/* global __dirname, global */

'use strict';

/* 
 * Money Controll is a quick small app to manage finantial transactions
 * Simple money flow
 * 
 * @version: 1.0.0
 * @author: mandriani
 */

var path = require('path');

global.config = require('./config/config.js');
// Fix Path problem
global.pathTo = function( uri ){
    return path.normalize(path.resolve(__dirname) + uri);
};

var express = require('express');
var app = express();

var routes = require(global.pathTo('/routes.js'));

var session = require('client-sessions');

// Change the session managment to Mozilla
app.use(session({
  cookieName: global.config.SESSION_COOKIE,
  secret: global.config.SESSION_SECRET,
  duration: global.config.SESSION_DURATION,
  activeDuration: global.config.SESSION_LIFETIME
}));

/**
 * Routing ...
 */
routes.use(app, express);

/**
 * Server starting
 */
var server = app.listen(global.config.SERVER_PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('[INFO] My Wallet server is running at http://%s:%s', host, port);
});
