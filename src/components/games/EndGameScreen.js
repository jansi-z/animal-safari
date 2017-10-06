import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import playAgain from '../../actions/games/playAgain'
import leaveGame from '../../actions/games/leave'

class EndGameScreen extends PureComponent {
  constructor() {
    super();
    this.hidden = true
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentGame.ended === false && nextProps.currentGame.ended === true)
      this.hidden = false
    else if (this.props.currentGame.ended === true && nextProps.currentGame.ended === false)
      this.hidden = true
  }

  playerItem(player) {
  return <tr><td>{ player.name }</td><td>{ player.gamesWon }</td></tr>

  }

  handleNope = () => {
    this.props.leaveGame(this.props.currentGame._id)
    this.props.push('/')
  }

  handleYep = () => {
    const gameId = this.props.currentGame._id

    this.props.playAgain(gameId)
  }

  render() {
    const winner = this.props.currentGame.winner
    const actions = [
      <FlatButton
        label="Back to lobby"
        primary={true}
        onClick={this.handleNope}
      />,
      <FlatButton
        label="Play again"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleYep}
      />,
    ]

    if (this.hidden === true) return null

    else if (!winner){

    return (
      <div>
        <RaisedButton label="Dialog" onClick={this.handleOpen} />
        <Dialog
          title={`Game over! The time ran out...`}
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
        </Dialog>
      </div>
    )}
    else if (winner){

    return (
      <div>
        <RaisedButton label="Dialog" onClick={this.handleOpen} />
        <Dialog
          title={`${winner} won!`}
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
        </Dialog>
      </div>
    )}
  }
}

const mapStateToProps = ({ currentGame }) => ({ currentGame })

export default connect(mapStateToProps, { push, playAgain, leaveGame })(EndGameScreen)
