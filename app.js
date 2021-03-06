var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var template = '/static/template/index.html';

app.get('/', function(req, res) {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + template);
});


http.listen(3000, function() {
  console.log('listening on *:3000');
});



io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });


  socket.on('rcv-msg', function(msg){
    console.log('message: ' + msg);
  });

  socket.broadcast.emit('hi',{data:"hello"});


});


// var app = require('http').createServer(handler)
//   , io = require('socket.io').listen(app)
//   , fs = require('fs');
//   var template = '/static/template/index.html';

// app.listen(3000);

// function handler (req, res) {
//   fs.readFile(__dirname+template,
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });
// }

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });