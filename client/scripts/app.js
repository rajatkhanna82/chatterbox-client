// YOUR CODE HERE:
var app = {};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.init = function(){


};

app.fetch =  function(){
$.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.messages = {};


app.renderMessage = function(message){
  var $msg = $(document.createElement("div"))
    .addClass("message ")
    .attr("username", message.username);

  var $username = $(document.createElement("div")).text(message.username).addClass("username");
  var $createAt = $(document.createElement("div")).text(message.createAt);
  var $text = $(document.createElement("div")).text(message.text);
  var $roomname = $(document.createElement("div")).text(message.roomname);

  $msg.append($username).append($createAt).append($text).append($roomname);
  $("body").append($msg).show();

  return $msg;
};

app.testMessage = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};
