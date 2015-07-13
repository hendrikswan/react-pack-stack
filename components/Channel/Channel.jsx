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
      return (
        <ListItem
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
