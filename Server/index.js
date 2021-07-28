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
    socket.on('send message', msg => {
      console.log(msg);
      io.emit('send message', msg)
    })

})