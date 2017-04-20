import React, { Component } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import i18n from 'i18next'

import items from '../../non-sign-in-links'

class Widget extends Component {
  render(){
    const {push} = this.props
    return (<List>
      {items.map((o, i) => (<ListItem key={i} onTouchTap={() => push(o.to)} primaryText={i18n.t(o.label)} leftIcon={o.icon} />))}
    </List>)
  }
}

Widget.propTypes = {
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push}
)(Widget)
