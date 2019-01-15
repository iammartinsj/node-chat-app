var formMessage = document.getElementById('message-form');
var ulMessages = document.getElementById('messages');
var btnSendlocation = document.getElementById('send-location');

var socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('newMessage', function(message){
  var createdAtFormatted = moment(message.createdAt).format('h:mm a');
  var li = document.createElement('li');
  li.innerHTML = `${message.from} ${createdAtFormatted}: ${message.text}`;
  ulMessages.appendChild(li);
});

socket.on('newMessageLocation', function(message){
  var createdAtFormatted = moment(message.createdAt).format('h:mm a');
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.setAttribute('target','_blank');
  a.setAttribute('href', message.url);
  a.innerHTML = "My current location";
  li.innerText = `${message.from} ${createdAtFormatted}: `
  li.appendChild(a);
  ulMessages.appendChild(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});
 
formMessage.addEventListener('submit', function(e){
  e.preventDefault();
  var messageInput = e.target.elements[0];
  socket.emit('createMessage', {
    from: 'User',
    text: messageInput.value
  }, function(){
    messageInput.value = '';
  });
});

btnSendlocation.addEventListener('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported to your browser');
  }
  var targetBtn = this;
  targetBtn.setAttribute('disabled', true);
  targetBtn.innerText = "Sending Location..."
  navigator.geolocation.getCurrentPosition(function(position){
    targetBtn.removeAttribute('disabled');
    targetBtn.innerText = "Send Location";
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    targetBtn.innerText('disabled');
    targetBtn.text = "Send Location";
    alert("Unable to fetch location");
  });
});

