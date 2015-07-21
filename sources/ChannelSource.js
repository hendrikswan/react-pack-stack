import Actions from '../actions';

let firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/channels');

let ChannelSource = {
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
