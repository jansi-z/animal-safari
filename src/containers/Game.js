import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import JoinGameButton from '../components/games/JoinGameButton'
import InputBar from './InputBar'
import Image from './Image'
import Playerlist from '../components/games/Playerlist'
import Timer from './Timer'
import ReadyButton from '../components/games/ReadyButton'

class Game extends PureComponent {
  componentWillMount() {
    const { game, fetchGames, getCurrentGame, subscribeToGames, subscribed } = this.props
    const { gameId } = this.props.match.params

    if (!game) fetchGames()
    getCurrentGame(gameId)
    if (!subscribed) subscribeToGames()
  }

  render() {
    const game = this.props.currentGame
    const currentUser = this.props.currentUser
    if (!game || !currentUser ) return null
    const started = this.props.currentGame.started
    return (
      <div className="Game">
        <Timer />
        { started ? (
          <div className="game-started">
            <Image />
            <InputBar />
          </div>
        ) : (
          <div className="not-started">
            <JoinGameButton />
            <ReadyButton />
          </div>
        )}


        <Playerlist />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]

  return {
    currentUser,
    currentGame,
    game,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  getCurrentGame,
  fetchGames,
  subscribeToGames,
})(Game)
