import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Image extends PureComponent {

  render() {
    const imagePath = "http://res.cloudinary.com/meganc94/image/upload/v1507117505/"

    const time = this.props.currentGame.time / 5 - 4;
    const { animals } = this.props.game
    const animal = animals[Math.floor(Math.random()*animals.length)]

    return (
      <div className="Image">
        <img src={`${imagePath}${animal}-1.jpg`} alt="hedgehog"/>
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentGame }) => {
  const game = games.filter((g) => (g._id === currentGame._id))[0]

  return {
    game,
    games,
    currentGame,
  }
}

export default connect(mapStateToProps)(Image)
