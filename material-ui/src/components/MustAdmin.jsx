import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18next'

class Widget extends Component{
  render () {
    const {children, user} = this.props
    return user.isAdmin ? children : (<div className="col-12">
      <h3>{i18n.t('errors.forbidden')} <code>{i18n.t('auth.errors.please-sign-in')}</code></h3>
    </div>)
  }
}

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default connect(
  state => ({user: state.currentUser})
)(Widget)
