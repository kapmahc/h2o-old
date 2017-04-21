import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import i18n from 'i18next'

import Application from './Application'

const Widget = ({user, children}) => user.uid ?
  (<Application>{children}</Application>) :
  (<Application>
    <Alert color="danger">
      <strong>{i18n.t('errors.forbidden')}:</strong> {i18n.t('auth.errors.please-sign-in')}
    </Alert>
  </Application>)

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default connect(
  state => ({user: state.currentUser}),
  {}
)(Widget)
