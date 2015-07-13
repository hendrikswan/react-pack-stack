var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants');
var Firebase = require('Firebase');
var moment = require('moment');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
var AuthStore = require('./AuthStore');

class MessageStore extends EventEmitter {
  constructor(){
    super();
    this.messagesRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages');
    this.registerWithDispatcher();

    AuthStore.addChangeListener(this.registerWithFirebase.bind(this));
  }

  registerWithFirebase(){
    this.messages = {};
    this.authInfo = AuthStore.getAuthInfo();

    this.messagesRef.once("value", (dataSnapshot) => {
      this.messages = dataSnapshot.val();

      _(this.messages)
        .values()
        .each((msg)=> {
          msg.ago = moment(new Date(msg.date)).fromNow();
        })
        .value();

      this.emit(CHANGE_EVENT);
    });

    this.messagesRef.on("child_added", (msg) => {
      if(this.messages[msg.key()]){
        return;
      }


      let msgVal = msg.val()
      msgVal.ago = moment(new Date(msgVal.date)).fromNow();
      this.messages[msg.key()] = msgVal;
      this.emit(CHANGE_EVENT);
    });
  }

  registerWithDispatcher(){
    this.dispatchToken = AppDispatcher.register((action)=>{
      switch(action.actionType){
        case AppConstants.CHAT_SEND_MESSAGE:
          var message = action.message;
          this.sendMessage(message);
          break;
        case AppConstants.CHAT_READ_MESSAGE:
          var message = action.message;
          this.readMessage(message);
          break;
      }
    });
  }



  readMessage(message){
    message.isRead = true;

    var msgRef = this.messagesRef.child(message.key);

    msgRef.update({
      isRead: true
    });

    this.emit(CHANGE_EVENT);
  }

  sendMessage(message){

    this.messagesRef.push({
        "message": message,
        "date": new Date().toUTCString(),
        "author": this.authInfo.user.google.displayName,
        "userId": this.authInfo.user.uid,
        "profilePic": this.authInfo.user.google.profileImageURL
    });
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getMessages(){
    return this.messages;
  }

  getUnreadCount(){
    return _.filter(this.messages, m => !m.isRead).length;
  }

}


module.exports = new MessageStore();
