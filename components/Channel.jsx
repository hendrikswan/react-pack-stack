import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';
import Actions from '../actions';

var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    CircularProgress,
    CardText,
    CardTitle
} = mui;



class Channel extends React.Component {
    constructor(props){
        super(props);
    }

    // onClick(){
    //   Actions.openChannel(this.props.channel);
    // }


    render(){
      var style = {};

      if(this.props.channel.selected){
        style.backgroundColor = '#F0F0F0';
      }

      return (
        <ListItem
          style={style}
          key={this.props.channel.key}
          //onClick={this.onClick.bind(this)}
          href={'/#/chat/' + this.props.channel.key}
          >
          {this.props.channel.name}
        </ListItem>
      );
    }
}

Channel.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Channel;
