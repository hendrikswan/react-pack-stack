var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants');
var Firebase = require('Firebase');
var moment = require('moment');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
var AuthStore = require('./AuthStore');
var ChannelStore = require('./ChannelStore');

class MessageStore extends EventEmitter {
  constructor(){
    super();
    this.registerWithDispatcher();
    this.messages = {};
    //AuthStore.addChangeListener(this.registerWithFirebase.bind(this));
    ChannelStore.addChangeListener(this.channelSelected.bind(this));
  }

  channelSelected(){
    this.channel = ChannelStore.getSelectedChannel();

    if(!this.channel) return;
    this.messages = {};

    this.authInfo = AuthStore.getAuthInfo();
    if(this.messageRef){
      this.messageRef.off();
    }

    this.messagesRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages/' + this.channel.key );

    this.messagesRef.once("value", ((dataSnapshot) => {
      this.messages = dataSnapshot.val();

      _(this.messages)
        .keys()
        .each((k)=> {
          let msg = this.messages[k];
          msg.key = k;
          msg.ago = moment(new Date(msg.date)).fromNow();
        })
        .value();

      this.emit(CHANGE_EVENT);
    }).bind(this));

    this.messagesRef.on("child_added", ((msg) => {
      if(this.messages[msg.key()]){
        return;
      }


      let msgVal = msg.val()
      msgVal.ago = moment(new Date(msgVal.date)).fromNow();
      msgVal.key = msg.key();
      this.messages[msg.key()] = msgVal;
      this.emit(CHANGE_EVENT);
    }).bind(this));
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
    if(!_.keys(this.messages).length){
      return null;
    }
    
    return this.messages;
  }

  getUnreadCount(){
    return _.filter(this.messages, m => !m.isRead).length;
  }

}


module.exports = new MessageStore();
