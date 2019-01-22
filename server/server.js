//Third Party Module
const express = require('express');
//Node Module
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage, generateMessageLocation } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const users = new Users();
app.use(express.static(publicPath));

//Socket Connection
io.on('connection', (socket) => {

  //User Join Event
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) && !isRealString(params.room)) {
      callback("Name and Room should be valid");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    console.log(users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome new user'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} join`));
    callback();
  });

  //User send Message Event
  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  //User send Location Event
  socket.on('createLocationMessage', (coord) => {
    const user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newMessageLocation', generateMessageLocation(user.name, coord.latitude, coord.longitude));
    }
  });

  //Disconnect User Event
  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} leave the room`));
    }
    console.log('User is disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server run at port ${port}`);
});