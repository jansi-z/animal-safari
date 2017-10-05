import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Timer extends PureComponent {
  constructor() {
    super();
    this.state = { time: 25 };
    this.timer = 0;
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    if (this.props.currentGame.started === true) {
      this.timer = setInterval(this.countDown.bind(this), 1000);
    }
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
    return (
      <div className="Timer">
        <h1> Time: {this.state.time} </h1>
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentGame }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]

  return {
    game,
    games,
    currentGame,
  }
}

export default connect(mapStateToProps)(Timer)
