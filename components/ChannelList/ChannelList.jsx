var React = require('react');
var mui = require('material-ui');
var ChannelStore = require('../../stores/ChannelStore');
var _ = require('lodash');

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



class ChannelList extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            channels: {},
            loading: true
        };
    }

    componentWillUnmount() {
      ChannelStore.removeChangeListener(this.onChange);
    }

    onChange(){
      this.setState({
        channels: ChannelStore.getChannels(),
        loading: false
      });
    }


    componentWillMount(){
        ChannelStore.addChangeListener(this.onChange.bind(this));
    }

    render(){
        if(this.state.loading){
            return (
            <Card>
              <CircularProgress mode="indeterminate" style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                margin: '0 auto',
                display: 'block',
                width: '60px'
              }} />
            </Card>
            );
        }

        var channels = this.state.channels;
        var channelNodes = _(channels)
        .keys()
        .map(function (k) {
            var channel = channels[k];
            return (
              <ListItem
                key={k}>
                {channel.name}
              </ListItem>
            );
        })
        .value();

        return (
            <Card style={{
              flexGrow: 1
            }}>
              <CardTitle  title="Channels"/>
              <List>
                {{channelNodes}}
              </List>
            </Card>

        );
    }
}

ChannelList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = ChannelList;
