var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants');
var Firebase = require('Firebase');
var CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor(){
    super();
    this.channelsRef = new Firebase('https://fiery-torch-9637.firebaseio.com/channels');
    this.registerWithDispatcher();
    this.registerWithFirebase();
  }


  registerWithFirebase(){
    this.channels = {};

    this.channelsRef.once("value", (dataSnapshot) => {
      debugger;
      this.channels = dataSnapshot.val();
      this.emit(CHANGE_EVENT);

      this.messagesRef.on("child_added", (channel) => {
        if(this.channels[channel.key()]){
          return;
        }


        let channelVal = channel.val()
        this.channels[channel.key()] = channelVal;
        this.emit(CHANGE_EVENT);
      });
    });
  }

  registerWithDispatcher(){
    this.dispatchToken = AppDispatcher.register((action)=>{
      switch(action.actionType){
        case AppConstants.CHANNEL_SELECT:
          var channel = action.channel;
          //should we do something?
          break;
      }
    });
  }


  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getChannels(){
    return this.channels;
  }
}


module.exports = new Store();
