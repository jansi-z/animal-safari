import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import panda from '../images/5.jpg'

class Image extends PureComponent {

  render() {
    return (
      <div className="Image">
        <img src={panda} alt="hedgehog"/>
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentGame }) => ({ games, currentGame })

export default connect(mapStateToProps)(Image)
