import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import joinGame from '../../actions/games/join'

class CreateGameButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  joinThisGame(event){
    const gameId = this.props.currentGame._id

    this.props.joinGame(gameId)
  }

  render() {

    if (this.props.currentGame.playerIds.includes(this.props.currentUser._id)) return null

    return (
      <div className="JoinGameButton">
        <RaisedButton
          label="Ready!"
          primary={true}
          onClick={this.joinThisGame.bind(this)}
         />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame }) => ({ currentUser, currentGame })

export default connect(mapStateToProps, { joinGame })(CreateGameButton)
