var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants');
var Firebase = require('Firebase');
var CHANGE_EVENT = 'change';
var AuthStore = require('./AuthStore');
var _ = require('lodash');


class ChannelStore extends EventEmitter {
  constructor(){
    super();
    this.channelsRef = new Firebase('https://fiery-torch-9637.firebaseio.com/channels');
    this.registerWithDispatcher();
    //AuthStore.addChangeListener(this.registerWithFirebase.bind(this));
    this.registerWithFirebase();
  }


  registerWithFirebase(){
    this.channels = {};

    this.channelsRef.once("value", (dataSnapshot) => {
      this.channels = dataSnapshot.val()
      _(this.channels)
        .keys()
        .each((k, i)=> {
          this.channels[k].key = k;
          if(i == 0){
            this.channels[k].selected = true;
          }
        })
        .value();

      this.emit(CHANGE_EVENT);
    });

    this.channelsRef.on("child_added", (channel) => {
      if(this.channels[channel.key()]){
        return;
      }


      let channelVal = channel.val()
      channelVal.key = channel.key();
      this.channels[channelVal.key] = channelVal;
      this.emit(CHANGE_EVENT);
    });
  }

  registerWithDispatcher(){
    this.dispatchToken = AppDispatcher.register((action)=>{
      switch(action.actionType){
        case AppConstants.CHANNEL_OPEN:
          var channel = action.channel;
          this.selectChannel(channel);
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

  selectChannel(channel){
    _(this.channels)
      .keys()
      .each((k)=> {
        let c = this.channels[k];
        c.selected = false;

        if(c == channel){
          c.selected = true;
        }
      })
      .value();

      this.emit(CHANGE_EVENT);
  }

  getChannels(){
    return this.channels;
  }

  getSelectedChannel(){
    return _.find(this.channels, {selected: true});
  }
}


module.exports = new ChannelStore();
