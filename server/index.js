const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const PORT = 8080;
const app = express();
const server = http.createServer(app);

let allUsers = [{id: 'abcdefg',
                    location: {coords: { latitude: 40.7484, longitude: -73.9870}}}]

const makeId = () => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('user entered');

  io.clients((error, clients) => {
    if (error) throw error;
    // console.log(clients);
  });

  socket.on('register', () => {
    const id = makeId()
    allUsers.push({id: id, location: null})
    socket.emit('registered', id)
  })

  socket.on('getPosition', (positionAndId) => {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i]['id'] === positionAndId.id) {
        allUsers[i]['location'] = positionAndId.data
      }
    }
    socket.emit('sendPosition', positionAndId.data)
    let allUsersWithLocation = allUsers.filter((eachUser) =>
      eachUser.location !== null
    )
    socket.broadcast.emit('sendUsers', allUsersWithLocation)
  })

  socket.on('getFriends', () => {
    let allUsersWithLocation = allUsers.filter((eachUser) =>
      eachUser.location !== null
    )
    socket.emit('sendFriends', JSON.stringify(allUsersWithLocation))
  })

  socket.on('disconnect', () => {
    console.log(`Connection ${socket.id} has left the building`)
  })
});

server.listen(PORT, () => {
  console.log('server started and listening on port ' + PORT);
});
