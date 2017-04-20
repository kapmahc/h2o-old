import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {List, ListItem} from 'material-ui/List'
import i18n from 'i18next'

import plugins from '../plugins'

class Widget extends Component{
  render () {
    const {user, push} = this.props
    console.log(plugins.dashboard(user))
    // {dashboard(user).map((o,i) => )}
    return user.uid ?
      (<div className="col-12">
      </div>) :
      (<div className="col-12">
        <List>
          {plugins.nonSignInLinks.map((o, i) => (<ListItem key={i} onTouchTap={() => push(o.to)} primaryText={i18n.t(o.label)} leftIcon={o.icon} />))}
        </List>
      </div>)
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {push},
)(Widget)
