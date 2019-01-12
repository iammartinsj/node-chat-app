const socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');
  // socket.emit('createMessage', {
  //   from: 'stranger',
  //   text: 'Join to chat room'
  // });
});

socket.on('newMessage', function(message){
  console.log(`${message.from}: ${message.text}`);
  console.log(`created: ${message.createdAt}`);
})

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});
