var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var Actions = require('../../actions');

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

    onClick(){
      Actions.openChannel(this.props.channel);
    }


    render(){
      var style = {};

      if(this.props.channel.selected){
        style.backgroundColor = '#F0F0F0';
      }

      return (
        <ListItem
          style={style}
          key={this.props.channel.key}
          onClick={this.onClick.bind(this)}
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
