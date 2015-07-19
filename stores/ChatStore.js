import alt from '../alt';
import Actions from '../actions';
import AuthService from '../Services/AuthService';

class ChatStore {
  constructor(){
    this.bindListeners({
      login: Actions.login
    });

    this.state = {
      user: AuthService.getUser(),
      channels: {},
      messages: {},
      authenticating: false
    };

  }

  login(user){
    this.setState({
      user: user
    });
  }
}

export default alt.createStore(ChatStore, 'ChatStore');
