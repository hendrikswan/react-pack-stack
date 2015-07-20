var Actions = require('../actions');
var firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/channels');

var ChannelSource = {
  getChannels: {
    remote(state){
      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var channels = dataSnapshot.val();
          resolve(channels);
        })
      });
    },

    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  }
}

export default ChannelSource;
