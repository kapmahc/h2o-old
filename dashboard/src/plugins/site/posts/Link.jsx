import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18next'

const Widget = ({name, label}) => (<a href={`/htdocs/${i18n.language}/posts/${name}`} target="_blank">{i18n.t(label)}</a>)

Widget.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default connect(
  state => ({}),
  {}
)(Widget)
