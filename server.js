#!/bin/env node

'use strict';

var express = require('express');
var fs      = require('fs');

function Server() {
    var self = this;

    self.setupVariables = function() {
        self.ipAddress = 'localhost';
        self.port      = 2000;
        self.indexPath = './frontend/index.html';
    };

    self.createRoutes = function() {
        self.routes = [{
            api: '/',
            method: 'GET',
            callback: function(req, res) {
                res.setHeader('Content-Type', 'text/html');
                fs.readFileSync().then(function(error, indexContent) {
                    if (error) {
                        throw new Error('Unable to find index.html');
                    }
                    res.send(indexContent.toString());
                });
            }
        }];
    };

    self.createServer = function() {
        self.createRoutes();
        self.server = express();
        self.server.use(express.static('./frontend'));

        for (var i = 0; i < self.routes.length; i++) {
            var route = self.routes[i];
            switch (route.method) {
                case 'GET':    return self.server.get(route.api, route.callback);
                case 'POST':   return self.server.post(route.api, route.callback);
                case 'PUT':    return self.server.put(route.api, route.callback);
                case 'DELETE': return self.server.delete(route.api, route.callback);
                default:       throw new Error('Unsupported HTTP method');
            }
        }
    };

    self.init = function() {
        self.setupVariables();
        self.createServer();
    };

    self.start = function() {
        self.server.listen(self.port, self.ipAddress, function() {
            console.log('Server started on port ', self.port);
        });
    };

};

var server = new Server();
server.init();
server.start();
