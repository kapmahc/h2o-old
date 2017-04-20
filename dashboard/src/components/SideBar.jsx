import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'

import i18n from 'i18next'

import {toggleSideBar} from '../actions'
import items from '../plugins/non-sign-in-links'

class Widget extends Component{
  constructor(props){
    super(props)
    this.state = {}
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle(to) {
    const {push, toggleSideBar} = this.props
      toggleSideBar()
      push(to)
  }
  render () {
    const {sideBar, user} = this.props
    return (<Drawer
      open={sideBar.open}
      docked={false}
      >
      <AppBar
        title={i18n.t('header.dashboard')}
        onTouchTap={()=>this.handleToggle('/')}
        />
      {
        user.id ?
          (<MenuItem>
            Menu Item aaa
          </MenuItem>) : items.map((o, i) => (<MenuItem key={i} onTouchTap={()=>this.handleToggle(o.to)} primaryText={i18n.t(o.label)} leftIcon={o.icon} />))
      }
    </Drawer>)
  }
}

Widget.propTypes = {
  sideBar: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(
  state => ({sideBar: state.sideBar, user: state.currentUser}),
  {toggleSideBar, push},
)(Widget)
