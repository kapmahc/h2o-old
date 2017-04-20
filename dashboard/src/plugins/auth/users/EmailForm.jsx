import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from 'i18next'

import Divider from 'material-ui/Divider'

import FormButtons from '../../../components/FormButtons'
import SharedLinks from './SharedLinks'

class Widget extends Component {
  render() {
    const {action} = this.props
    return (<div>
      <form>
        <h2>{i18n.t(`auth.users.${action}.title`)}</h2>
        <Divider/>
        <FormButtons />
      </form>
      <br/>
      <SharedLinks />
    </div>)
  }
}

Widget.propTypes = {
  action: PropTypes.string.isRequired
}

export default connect(
  state => ({}),
  {}
)(Widget)
