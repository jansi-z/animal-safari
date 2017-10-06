// src/components/ui/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const TITLE = 'Safari Guessing Game'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.signUp = this.signUp.bind(this)
    this.goHome = this.goHome.bind(this)
  }

  signOut(event) {
    event.preventDefault()
    this.props.signOut()
  }

  signUp() {
    this.props.push('/sign-up')
  }

  signIn() {
    this.props.push('/sign-in')
  }

  goHome() {
    this.props.push('/')
  }

  render() {
    const { signedIn } = this.props

    const UnLogged = () => (
      <IconMenu
        iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign in" onClick={this.signIn} />
        <MenuItem primaryText="Sign up" onClick={this.signUp} />
      </IconMenu>
    );

    // UnLogged.muiName = 'IconMenu';

    const Logged = () => (
      <IconMenu
        iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign out" onClick={this.signOut.bind(this)} />
      </IconMenu>
    );

    // Logged.muiName = 'IconMenu';

    return (
      <AppBar
        title={TITLE}
        iconElementLeft={<IconButton onClick={this.goHome}><GameIcon /></IconButton>}
        iconElementRight={signedIn ?
          <Logged /> : <UnLogged />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
