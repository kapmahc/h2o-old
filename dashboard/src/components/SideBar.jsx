import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import i18n from 'i18next'

import {toggleSideBar} from '../actions'

class Widget extends Component{
  render () {
    const {sideBar, toggleSideBar} = this.props
    return (<Drawer
      open={sideBar.open}
      docked={false}
      >
      <AppBar
        title={i18n.t('header.dashboard')}
        onTouchTap={toggleSideBar}
        />
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </Drawer>)
  }
}

Widget.propTypes = {
  sideBar: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired
}

export default connect(
  state => ({sideBar: state.sideBar}),
  {toggleSideBar},
)(Widget)
