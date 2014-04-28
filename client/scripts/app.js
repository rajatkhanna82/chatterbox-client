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
  that = this;
$.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    order: "-createAt",
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      console.log(data);
      that.updateData(data.results);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.messageIDs  = {};
app.rooms       = {};
app.users       = {};


app.renderMessage = function(message){
  var $msg = $(document.createElement("div"))
    .addClass("message ")
    .attr("username", message.username);

  var $username = $(document.createElement("div")).text(message.username).addClass("username");
  var $createAt = $(document.createElement("div")).text(message.createAt);
  var $text = $(document.createElement("div")).text(message.text);
  var $roomname = $(document.createElement("div")).text(message.roomname);

  $msg.append($username).append($createAt).append($text).append($roomname);
  return $msg;
};


app.updateData = function(messageArray){
  _.each(messageArray, function(message, i){
    console.log(message);
    var id = message.objectId;
    if(!app.messageIDs[id]){
      app.messageIDs[id] = true;
      if(!app.rooms[message.roomname]){
        app.rooms[message.roomname] = [];
      }
      app.rooms[message.roomname].push(message);

      if(!app.users[message.username]){
        app.users[message.username] = [];
      }

      app.users[message.username].push(message);
    }
  });
};


app.testMessage = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};
