import React from 'react'
import PropTypes from 'prop-types'

const Widget = ({name}) => (<i className="material-icons">{name}</i>)

Widget.propTypes = {
  name: PropTypes.string.isRequired
}

export default Widget
