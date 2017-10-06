import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import addGuess from '../actions/games/guess'
import { connect } from 'react-redux'

class InputBar extends PureComponent {
  submitGuess(event) {
    event.preventDefault();
    const guess = this.refs.guess.getValue();
    const gameId = this.props.currentGame;
    const player = this.props.currentUser.name;
    const guessData = { player: player, guess: guess }

    this.props.addGuess(gameId, guessData);
    document.getElementById("guessForm").reset()
  }

  render() {

    return (
      <form id="guessForm" onSubmit={this.submitGuess.bind(this)}>
        <TextField
          hintText="Guess an Animal"
          floatingLabelText="Guess:"
          ref="guess"
        />
      </form>
    )
  }

}

const mapStateToProps = ({ currentGame, currentUser }) => ({ currentGame, currentUser })

const mapDispatchToProps = { addGuess }

export default connect (mapStateToProps, mapDispatchToProps)(InputBar)
