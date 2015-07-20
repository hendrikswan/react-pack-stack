var React = require('react');
var mui = require('material-ui');
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

import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../../stores/ChatStore';


@connectToStores
class ChannelList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            channels: null
        };

        console.log('channel list constructed');

        ChatStore.getChannels();
    }

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

    onClick(){
      Actions.openChannel();
    }


    // componentWillMount(){
    //   // var channels = ChannelStore.getChannels();
    //   // if(channels){
    //   //   this.setState({
    //   //     channels: channels,
    //   //     loading: false
    //   //   });
    //   // }
    //   // ChannelStore.addChangeListener(this.onChange.bind(this));
    //   console.log('channel list will mount')
    // }

    render(){
        if(!this.props.channels){
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

        let channels = this.props.channels;
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
