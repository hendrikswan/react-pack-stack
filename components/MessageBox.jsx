import React from 'react';
import mui from 'material-ui';
import trim from 'trim';
import AppActions from '../actions';
import ChatStore from '../stores/ChatStore';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

var {
    Card,
    TextField,
    RaisedButton
} = mui;


@Radium
@connectToStores
class MessageBox extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            "message": ""
        };
    }

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }



    render(){
        var view = (
          <textarea
              value={this.state.message}
              onKeyUp={this.onKeyUp.bind(this)}
              onChange={this.onChange.bind(this)}
              style={{
                width: '100%',
                borderColor: '#D0D0D0',
                resize: 'none',
                borderRadius: '3px',
                minHeight: '50px',
                color: '#555 !important',
                fontSize: '14px !important',
                outline: 'auto 0px !important'
              }} />
        );

        if(!this.props.user){
          view = (
            <RaisedButton
              style={{
                display: 'block',
              }}
              label="Log in to participate"
              primary={true}
              linkButton={true}
              href="/#/login"
            />
          );
        }

        return (
            <Card style={{
              maxWidth: '1200px',
              margin: '30px auto',
              padding: '30px'
            }}>
              {view}
            </Card>

        );
    }

    onChange(event) {
        this.setState({
          message: event.target.value
        });
    }

    onKeyUp(evt){
        if(evt.keyCode === 13 && trim(event.target.value) != ''){
            evt.preventDefault();
            this.setState({
                message: ''
            });

            AppActions.sendMessage(event.target.value);
        }
    }
}

MessageBox.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = MessageBox;
