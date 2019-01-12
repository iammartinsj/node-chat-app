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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome New User',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user join to chat',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
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