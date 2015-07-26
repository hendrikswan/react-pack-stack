import Actions from '../actions';
import _ from 'lodash';

let firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/channels');

let ChannelSource = {
  getChannels: {
    remote(state, selectedChannelKey){
      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var channels = dataSnapshot.val();
          var selectedChannel =channels[selectedChannelKey];
          if(selectedChannel){
            selectedChannel.selected = true;
          }
          resolve(channels);
        })
      });
    },

    success: Actions.channelsReceived,
    error: Actions.channelsFailed
  }
}

export default ChannelSource;
