import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class EndGameScreen extends PureComponent {
  constructor() {
    super();
    this.hidden = true
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentGame.ended === false && nextProps.currentGame.ended === true)
      this.hidden = false
  }

  playerItem(player) {
  debugger
  return <tr><td>{ player.name }</td><td>{ player.gamesWon }</td></tr>

  }

  handleNope = () => {
    this.props.push('/')
  }

  handleYep = () => {
    return
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
          title={"Game over!"}
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
          <table>
            <tr>
              <th>Name</th>
              <th>Games won</th>
            </tr>
            { this.props.currentGame.players.map(this.playerItem.bind(this)) }
          </table>
        </Dialog>
      </div>
    )}
  }
}

const mapStateToProps = ({ currentGame }) => ({ currentGame })

export default connect(mapStateToProps, { push })(EndGameScreen)
