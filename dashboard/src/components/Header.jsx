import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import i18n from 'i18next'

import {toggleSideBar} from '../actions'

class Widget extends Component{
  render () {
    const {toggleSideBar} = this.props
    return (<AppBar
      title={`${i18n.t('site.subTitle')}-${i18n.t('site.title')}`}
      iconClassNameRight="material-exit-to-app"
      onLeftIconButtonTouchTap={toggleSideBar}
    >
    </AppBar>)
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
