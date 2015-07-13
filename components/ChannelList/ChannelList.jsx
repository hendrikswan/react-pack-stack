var React = require('react');
var mui = require('material-ui');
var ChannelStore = require('../../stores/ChannelStore');
var Channel = require('../Channel/Channel.jsx');
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

    onClick(){
      Actions.openChannel();
    }


    componentWillMount(){
      var channels = ChannelStore.getChannels();
      if(channels){
        this.setState({
          channels: channels,
          loading: false
        });
      }
      ChannelStore.addChangeListener(this.onChange.bind(this));
    }

    render(){
        if(this.state.loading){
            return (
              <Card style={{
                flexGrow: 1
              }}>
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

        let channels = this.state.channels;
        let channelNodes = _(channels)
        .keys()
        .map((k)=>  {
            let channel = channels[k];
            return (
              <Channel channel={channel} />
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
