import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18next'

import PersonalBar from './PersonalBar'

class Widget extends Component {
  render() {
    const {user} = this.props
    var items = []
    if(user.uid) {
      if(user.isAdmin) {

      }
    }else{
      items.push({label: "auth.errors.please-sign-in"})
    }
    return (<div></div>)
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {}
)(Widget)
