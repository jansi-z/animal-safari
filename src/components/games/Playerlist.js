import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List';

class Playerlist extends PureComponent {

  displayPlayerName(player, index) {
    const style = {
      color: "#4286f4"
    };

    const icon = {
      position: "relative",
      top: "39px",
      left: "-90px",
      overflow: "hidden"
    }

    const currentUserName = this.props.currentUser.name

    if (currentUserName === player.name) {
      return (
        <div>
          <i className="material-icons" style={icon}>accessibility</i>
          <ListItem
            primaryText={`Player ${index + 1}: ${player.name}`}
            key={player._id}
            style={ style }
          />
        </div> )
    } else {
      return <ListItem primaryText={`Player ${index + 1}: ${player.name}`} key={player._id} />
    }
  }

  render() {
    const players = this.props.currentGame.players
    if (players.includes(null)) return null
    return(
      <div className="player-list">
        <List>
          { players.map(this.displayPlayerName.bind(this)) }
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame }) => ({ currentUser, currentGame })

export default connect(mapStateToProps, null)(Playerlist)
