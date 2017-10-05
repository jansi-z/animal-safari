import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Playerlist extends PureComponent {

  displayPlayerName(player) {
    return <ListItem primaryText={ player.name } key={player._id} />
  }

  render() {
    const players = this.props.currentGame.players
    if (players.includes(null)) return null
    return(
      // <MobileTearSheet>
        <List>
          { players.map(this.displayPlayerName.bind(this)) }
        </List>

      // </MobileTearSheet>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame }) => ({ currentUser, currentGame })

export default connect(mapStateToProps, null)(Playerlist)
