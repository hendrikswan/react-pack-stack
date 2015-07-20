import alt from '../alt';
import Actions from '../actions';
import AuthService from '../Services/AuthService';
import ChannelSource from '../sources/ChannelSource';
import MessageSource from '../sources/MessageSource';
import {datasource, decorate, bind} from 'alt/utils/decorators';
import _ from 'lodash';
import moment from 'moment';

@datasource(MessageSource, ChannelSource)
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
      channels,
      selectedChannel
    });

    this.getInstance().getMessages();
  }

  _prepMsg(msg, key){
    msg.key = key;
    msg.ago = moment(new Date(msg.date)).fromNow();
  }

  @bind(Actions.messagesReceived)
  receivedMessages(messages) {
    _(messages)
      .keys()
      .each((k)=> {
        this._prepMsg(messages[k], k);
      })
      .value();

    this.setState({
      messages
    });
  }

  @bind(Actions.messageReceived)
  receivedMessage(msg) {
    if(this.state.messages[msg.key]){
      return;
    }

    this._prepMsg(msg);

    this.state.messages[msg.key] = msg;

    this.setState({
      messages: this.steate
    });
  }

  login(user){
    this.setState({
      user: user
    });
  }
}

export default alt.createStore(ChatStore);
