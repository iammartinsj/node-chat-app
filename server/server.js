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
const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome new user'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user join'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback("Acknowledge by the server");
  });

  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server run at port ${port}`);
});