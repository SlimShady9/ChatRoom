/**
 * Author : Laura Daniela Chiquillo Leon (el amor de mi vida)
 */

const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    }
  });
const port = (process.env.PORT || 8000)


server.listen(port, () => {
  console.log('Server listening on port ' + port);
})

io.on('connection', (socket) => {
  // initial conection and information
  console.log('a user connected');
  socket.on('request user list', () => {
    var users = countUsers()
    io.emit('user list', users)
  })
  socket.on('add name', (name, callback) => {
    var uniqueName = true
    io.fetchSockets()
    .then(sockets => sockets.map(sock => sock.name ? sock.name : ''))
    .then(socketNames => socketNames.forEach( i => {
      if (i.toUpperCase() === name.toUpperCase()) uniqueName = false
    }))
    .then(() => {
      if (uniqueName) {
        socket.name = name
      }
      callback({
        nameUniqueness: uniqueName
      })
    })

  })
  socket.on('join to room', roomName => {
    console.log('joining to room', roomName)
    socket.join(roomName)
    console.log(socket.rooms)
    var users = countUsers()
    io.emit('user list', users)
  })
  socket.on('leave room', roomName => {
    console.log('leaving room' , roomName)
    socket.leave(roomName)
    console.log(socket.rooms)
    var userList = getUsersFromRoom(roomName)
    io.to(roomName).emit('connected user list', userList)
  })

  socket.on('send message', (msg, socketRoom) => {
    console.log('message sent', msg)
    io.to(socketRoom).emit('recieve message', {content: msg, name: socket.name})
  })
  socket.on('disconnect', (socketRoom) => io.to(socketRoom).emit(('user disconnected'), socket.name))
  socket.on('user typing', (socketRoom) => {
    io.to(socketRoom).emit('user typing', socket.name)
  })
  socket.on('user stop typing', (socketRoom) => {
    io.to(socketRoom).emit('user stop typing', socket.name)
  })
  socket.on('request connected users' , (socketRoom) => {
    var userList = getUsersFromRoom(socketRoom)
    io.to(socketRoom).emit('connected user list', userList)
  })
})


const countUsers = () => {
  const userRooms = []

  for (const [key, value] of io.sockets.adapter.rooms) {
    if (key.includes('Sala')) {
      userRooms.push({name:key, users:value.size, roomNumber: key.substr(-1)})
    }
  }
  
  return userRooms
}

const getUsersFromRoom = roomName => {
  const users = io.sockets.adapter.rooms.get(roomName)
  return users ? Array.from(users).map(user => io.sockets.sockets.get(user).name) : 0
}