var formMessage = document.getElementById('message-form');
var ulMessages = $('#messages');
var btnSendlocation = document.getElementById('send-location');
var userList= $('#users');

var socket = io();
socket.on('connect', function () {
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    } else{
    }
  })
});

function ScrollToBottom(){
  //Selector
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Message
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('newMessage', function(message){
  var createdAtFormatted = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    createdAt: createdAtFormatted,
    text: message.text
  });
  ulMessages.append(html);
  ScrollToBottom();
});

socket.on('newMessageLocation', function(message){
  var createdAtFormatted = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    createdAt: createdAtFormatted,
    url: message.url
  });
  ulMessages.append(html);
  ScrollToBottom();
});

socket.on('updateUserList', function(users){
  var ol = $('<ol></ol>')
  users.forEach(function(user){
    ol.append($('<li></li>').text(user))
  });
  userList.html(ol);
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});
 
//Send Message Using Socket
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
    //Send Location Message Using Socket
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

