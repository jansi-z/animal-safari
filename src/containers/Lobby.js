import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import CreateGameButton from '../components/games/CreateGameButton'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye';
import JoinGameIcon from 'material-ui/svg-icons/social/person-add';
import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset';
import WaitingIcon from 'material-ui/svg-icons/image/timelapse';
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    const { subscribed, fetchGames, subscribeToGames } = this.props
    fetchGames()
    if (!subscribed) subscribeToGames()
  }

  goToGame(gameId) {
    const { push } = this.props

    return () => {
      push(`/games/${gameId}`)
    }
  }

  isJoinable(game) {
    if (game.started) return false
    return !!!this.isPlayer(game)
  }

  isPlayer(game) {
    if (game.players instanceof Object) {
      return game.players._id === this.props.currentUser._id
    }
    return game.players
      .map((p) => (p._id))
      .includes(this.props.currentUser._id)
  }

  renderGame(game, index) {
    let ActionIcon = this.isJoinable(game) ? JoinGameIcon : WatchGameIcon
    if (this.isPlayer(game)) ActionIcon = game.isPlayable ? PlayGameIcon : WaitingIcon

    return (
      <MenuItem
        key={index}
        onClick={this.goToGame(game._id).bind(this)}
        rightIcon={<ActionIcon />}
        primaryText={game.title} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateGameButton />
        <Paper className="paper">
          <Menu>
            { this.props.games.map(this.renderGame.bind(this))}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentUser, subscriptions }) => (
  {
    games,
    currentUser,
    subscribed: subscriptions.includes('games'),
  }
)

export default connect(mapStateToProps, { fetchGames, subscribeToGames, push })(Lobby)
