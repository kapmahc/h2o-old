import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

import {toggleStatusBar} from '../actions'

class Widget extends Component{
  render () {
    const {statusBar, toggleStatusBar} = this.props
    return (<Snackbar
      open={statusBar.open}
      message={statusBar.message}
      autoHideDuration={4000}
      onRequestClose={()=>toggleStatusBar()}
    />)
  }
}


Widget.propTypes = {
  statusBar: PropTypes.object.isRequired,
  toggleStatusBar: PropTypes.func.isRequired
}

export default connect(
  state => ({statusBar: state.statusBar}),
  {toggleStatusBar},
)(Widget)
