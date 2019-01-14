var formMessage = document.getElementById('message-form');
var ulMessages = document.getElementById('messages-ul');

var socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('newMessage', function(message){
  console.log(`${message.from}: ${message.text}`);
  console.log(`created: ${message.createdAt}`);
  var li = document.createElement('li');
  li.innerHTML = `${message.from}: ${message.text}`;
  ulMessages.appendChild(li);
})

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});
 
formMessage.addEventListener('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: e.target.elements[0].value,
  }, function(res){
    console.log(res);
  });
});


