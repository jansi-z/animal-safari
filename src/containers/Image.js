import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Image extends PureComponent {
  constructor() {
    super();
    this.state = { time: 5 };
    this.timer = 0;
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.currentGame.started === true && this.props.currentGame.started === false) {
      this.startTimer()
    }
  }

  startTimer() {
    this.timer = setInterval(this.countDown.bind(this), 5000);
  }

  countDown() {
    let seconds = this.state.time - 1;

    if (seconds < 1) {
      clearInterval(this.timer);
    }

    this.setState({
      time: seconds,
    });
  }

  render() {
    const imagePath = "http://res.cloudinary.com/meganc94/image/upload/"
    const animal = this.props.currentGame.animal

    return (
      <div className="Image">
        <img src={`${imagePath}${animal}-${this.state.time}-m.jpg`} alt="hedgehog"/>
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
