var http = require('http');
var express = require('express');
var browserify = require('browserify-middleware');
var _ = require('lodash');

var app = express();

app.use(express.logger('dev'));

app.get('/build.js', browserify('./index.js', { transform: [ 'reactify'] }));

app.use(express.static(__dirname));

var server = http.createServer(app);

server.listen(3000, function () {
  console.log('3000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  socket.on('component-change', function (data) {
    socket.broadcast.emit('component-change', data);
  });

});
