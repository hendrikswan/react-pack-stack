var Firebase = require('Firebase');


class ChannelService {
  constructor(){
    this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/channels');
  }

  initChannels(){
    return new Promise((resolve, reject) => {
      this.firebaseRef.once("value", (dataSnapshot) => {
        var channels = dataSnapshot.val();

        _(channels)
          .keys()
          .each((k, i)=> {
            this.channels[k].key = k;
            if(i == 0){
              this.channels[k].selected = true;
            }
          })
          .value();

          resolve(channels);
      });

      //add dependency to actions?
      // this.channelsRef.on("child_added", (channel) => {
      //   if(this.channels[channel.key()]){
      //     return;
      //   }
      //
      //
      //   let channelVal = channel.val()
      //   channelVal.key = channel.key();
      //   this.channels[channelVal.key] = channelVal;
      //   this.emit(CHANGE_EVENT);
      // });
    });
  }
}

module.exports = new ChannelService();
