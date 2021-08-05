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
    console.log('An user connected');
    socket.name = socket.handshake.query.name
    io.fetchSockets()
    .then(sockets => sockets.map((socket) => socket.name))
    .then(socketsNames => io.emit('send active user list', socketsNames))
    socket.on('send message', msg => {
      console.log(msg);
      io.emit('send message', msg)
    })
    socket.on('disconnect', () => io.emit(('user disconnected'), socket.name))
    socket.on('user typing', () => {
      io.emit('user typing', socket.name)
    })
    socket.on('user stop typing', () => {
      io.emit('user stop typing', socket.name)
    })

})