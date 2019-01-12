//Third Party Module
const express = require('express');
//Node Module
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log('message', message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server run at port ${port}`);
});