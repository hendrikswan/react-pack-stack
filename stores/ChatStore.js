import alt from '../alt';
import Actions from '../actions';
import AuthService from '../Services/AuthService';
import ChannelDataSource from './ChannelDataSource';
import {datasource, decorate, bind} from 'alt/utils/decorators';
import _ from 'lodash';

@datasource(ChannelDataSource)
@decorate(alt) //why is this necessary?
class ChatStore {
  constructor(){
    this.bindListeners({
      login: Actions.login
    });

    this.state = {
      user: AuthService.getUser(),
      channels: null,
      messages: null,
      selectedChannel: null
    };
  }

  @bind(Actions.channelsReceived)
  receivedChannels(channels) {
    let selectedChannel;
    _(channels)
      .keys()
      .each((k, i)=> {
        channels[k].key = k;
        if(i == 0){
          channels[k].selected = true;
          selectedChannel = channels[k];
        }
      })
      .value();
    this.setState({
      channels: channels,
      selectedChannel: selectedChannel
    });
  }

  login(user){
    this.setState({
      user: user
    });
  }
}

export default alt.createStore(ChatStore);
