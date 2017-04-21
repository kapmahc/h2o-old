import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18next'

const Widget = () => (<div>language bar</div>)

Widget.propTypes = {
  user: PropTypes.object.isRequired
}

export default Widget
