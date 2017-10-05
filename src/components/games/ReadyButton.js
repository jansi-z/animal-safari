import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import startGame from '../../actions/games/start'

class ReadyButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  startThisGame(event){
    const gameId = this.props.currentGame._id

    this.props.startGame(gameId)
  }

  render() {

    if (this.props.currentGame.readyPlayers.includes(this.props.currentUser._id)) return null

    return (
      <div className="JoinGameButton">
        <RaisedButton
          label="I'm ready to start playing!"
          primary={true}
          onClick={this.startThisGame.bind(this)}
         />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame }) => ({ currentUser, currentGame })

export default connect(mapStateToProps, { startGame })(ReadyButton)
