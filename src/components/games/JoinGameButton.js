import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import joinGame from '../../actions/games/join'

class JoinGameButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  handleNope = () => {
    this.props.push('/') // back to the lobby with you!
  }

  handleYeah = () => {
    const gameId = this.props.currentGame._id

    this.props.joinGame(gameId)
  }

  render() {

    if (this.props.currentGame.playerIds.includes(this.props.currentUser._id)) return null

    const game = this.props.currentGame
    const actions = [
      <FlatButton
        label="Nope"
        primary={true}
        onClick={this.handleNope}
      />,
      <FlatButton
        label="Hell, Yeah!"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleYeah}
      />,
    ]

    return (
      <div>
        <RaisedButton label="Dialog" onClick={this.handleOpen} />
        <Dialog
          title={`Want to join ${game.title}?`}
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
          <p>Hey there! Join this game for an exciting animalicious adventure!</p>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame }) => ({ currentUser, currentGame })

export default connect(mapStateToProps, { push, joinGame })(JoinGameButton)
