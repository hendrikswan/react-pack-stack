var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants');
var Firebase = require('Firebase');

var CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor(){
    super();
    this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages');
    this.register();
  }

  // setAuth(auth){
  //   this.auth = auth;
  // }

  register(){
    AppDispatcher.register((action)=>{
      switch(action.actionType){
        case AppConstants.CHAT_SEND_MESSAGE:
          var message = action.message;
          this.sendMessage(message);
          break;
      }
    });
  }

  sendMessage(message){
    this.firebaseRef.push({
        "message": message,
        "date": new Date().toUTCString(),
        "author": "Hendrik Swanepoel",
        "profilePic": "http://www.gravatar.com/avatar/a424e1b0ab3a8dee82c25ae0f0804107?s=48&d=identicon"
    });
  }

}


module.exports = new Store();
