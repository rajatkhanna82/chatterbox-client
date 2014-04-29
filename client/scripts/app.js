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
app.usernameRoom = {};  //keys = user, value = room of their last message

app.updateData = function(messageArray){
  //epic data update handler of doom!!!!!!
  _.each(messageArray, function(message, i){
    var id = message.objectId;
    if(!this.messageIDs[id]){ //check if is new message
      this.messageIDs[id] = true;

      if(!this.rooms[message.roomname]){ //check if is new room
        this.rooms[message.roomname] = [];  //add room to list of rooms
        this.addRoomToList(message.roomname); //add the room to the DOM
      }
      this.rooms[message.roomname].push(message); //add message to room's message list

      //if user has switched rooms
      if(this.usernameRoom[message.username] !== message.roomname){
        if(message.roomname === this.current.room &&
          this.usernameRoom[message.username] !== this.current.room){
            this.addUserToList(message.username);
          //add to the list
        }else if(this.usernameRoom[message.username] === this.current.room){
          //remove from username list
          this.removeUserFromList(message.username);
        }
        this.usernameRoom[message.username] = message.roomname; //update user's current room
      }
      //if the message goes to the app.currentRoom
        //if belongs to the selected user (or all)
          //update the list of messages currently being displayed
        //if the user is new user to this room, then append username to user list
      if(message.roomname === this.current.room){
        if(this.current.user === ""|| this.current.user === message.username){
          this.addMessageToList(message); //append the message to the DOM
        }
      }
    }
  }, this);
};

// app.renderRoomContent = function(messages){
//   //render messages
//   var $ul = $("#messageList");
//   _.each(messages, function(message, i){
//     var $li = $(document.createElement("li"));
//     $li.append(app.renderMessage(message));
//     $ul.append($li);
//   });
// };
app.addUserToList = function(user){
  var $ul   = $("#userList");
  var $user = app.renderUser(user);
  $ul.append($user);
};

app.removeUserFromList = function(user){
  var $users = $(".user");
  _.each($users, function(node, i){
    if($(node).attr("name") === user){
      $(node).remove();
    }
  });
}

app.renderUser = function(user){
  var $user = $(document.createElement("li"))
  .append($(document.createElement("div")))
  .text(user)
  .addClass("user")
  .attr("name", user);
  return $user;
};

app.addRoomToList = function(room){
  var $ul   = $("#roomList");
  var $room = app.renderUser(room);
  $ul.append($room);
};

app.renderRoom = function(room){
  var $room = $(document.createElement("li"))
    .text(room)
    .addClass("room")
    .attr("name", room);
  return $room;
};

app.addMessageToList = function(msg){
  var $ul   = $("#messageList");
  var $msg = app.renderMessage(msg);
  $ul.append($msg);
};

app.renderMessage = function(message){
  var $msg = $(document.createElement("li"))
    .addClass("message " + message.username + " " + message.roomname);
  var $username = $(document.createElement("div")).text(message.username).addClass("username");
  var $createdAt = $(document.createElement("div")).text(message.createdAt);
  var $text = $(document.createElement("div")).text(message.text);
  var $roomname = $(document.createElement("div")).text(message.roomname);

  $msg.append($username).append($createdAt).append($text).append($roomname);
  return $msg;
};

app.testMessage = {
  'objectId': 1,
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};

app.current = {};
app.current.room = "4chan";
app.current.user = "";
app.current.users = [];
