// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// http.listen(3000, function(){
//   console.log('listening on localhost:3000');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = 5000;

const app = express();
const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', socket => {
  console.log('client connected on websocket');
});

app.get('/', (req, res, next) => {
  res.send({hello: 'hi'});
})

server.listen(PORT, () => {
  console.log('server started and listening on port ' + PORT);
});


// const express = require('express')
// const PORT = 5000
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

// app.use((req, res, next) => {
//   res.send('hi');
// });


// io.on('connection', (socket) => {
//     socket.emit('greeting', {hello: 'hi'});

//   console.log('user entered');
//   io.clients((error, clients) => {
//     if (error) throw error;
//     console.log(clients);
//   });

//   socket.on('initial', (message) => console.log(message));

//   socket.on('position', (position) => {
//     console.log('position with id -n', position)
//     socket.emit('response', position)
//     socket.broadcast.emit('otherPositions', position);
//   })

//   socket.on('disconnect', () => {
//     console.log(`Connection ${socket.id} has left the building`)
//   })
// });

// module.exports = app;
