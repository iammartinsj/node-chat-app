//Third Party Module
const express = require('express');
//Node Module
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage, generateMessageLocation } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) && !isRealString(params.room)){
      callback("Name and Room should be valid");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    console.log(users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin','Welcome new user'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} join`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback("Acknowledge by the server");
  });

  socket.on('createLocationMessage', (coord) => {
    io.emit('newMessageLocation', generateMessageLocation('Admin', coord.latitude, coord.longitude));
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} leave the room`));
    }
    console.log('User is disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server run at port ${port}`);
});