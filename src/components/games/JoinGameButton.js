import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import joinGame from '../../actions/games/join'

class CreateGameButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  joinThisGame(event){
    const gameId = this.props.currentGame
    debugger
    this.props.joinGame(gameId)
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateGameButton">
        <RaisedButton
          label="Ready!"
          primary={true}
          onClick={this.joinThisGame.bind(this)}
         />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame }) => ({
  signedIn: !!currentUser && !!currentUser._id, currentGame
})

export default connect(mapStateToProps, { joinGame })(CreateGameButton)
