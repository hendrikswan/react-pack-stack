var React = require('react');
var mui = require('material-ui');
var {
    FloatingActionButton,
    RaisedButton,
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardActions,
    FlatButton,
    CardText,
    Avatar,
    AppBar
} = mui;

require('./AuctionList.scss');

class AuctionList extends React.Component {
    constructor(props){
        super(props);

        this.state={
            auctions: [
                {
                    "title": "Vespa",
                    "amount": 1000,
                    "description" : "A black vespa",
                    "expirationDate": '4 hours left'
                },
                {
                    "title": "Vespa",
                    "amount": 1000,
                    "description" : "A black vespa",
                    "expirationDate": '4 hours left'
                },
                {
                    "title": "Vespa",
                    "amount": 1000,
                    "description" : "A black vespa",
                    "expirationDate": '4 hours left'
                },
                {
                    "title": "Vespa",
                    "amount": 1000,
                    "description" : "A black vespa",
                    "expirationDate": '4 hours left'
                }
            ]
        };
    }



    render(){
        var auctionNodes = this.state.auctions.map(function (auction) {
            var metaOverlay = (
                <div className="AuctionList_meta">

                    <div className="AuctionList_meta_row">
                        <div className="AuctionList_meta_title">
                            {auction.title}
                        </div>
                        <div className="AuctionList_meta_amount">
                            ${auction.amount}
                        </div>
                    </div>
                    <div className="AuctionList_meta_expiration_date">
                        {auction.expirationDate}
                    </div>
                </div>
            );

            return (
                <Card className="AuctionList_item">
                    <CardMedia overlay={metaOverlay}>
                        <img src="http://lorempixel.com/380/200/nature?i={auction.title}"/>
                    </CardMedia>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>
            );
        });

        return (
            <div className="AuctionList">
                {auctionNodes}
                <FloatingActionButton style={{
                    position: 'absolute',
                    right: '30px',
                    top: '30px',
                    zIndex:100
                }}
                iconClassName="icon icon-plus" />
            </div>
        );
    }
}

AuctionList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

//React.render(<AuctionList  />, document.getElementById('container'));
module.exports = AuctionList;
