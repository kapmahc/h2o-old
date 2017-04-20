import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import i18n from 'i18next'

import plugins from '../plugins'
import MobileTearSheet from './MobileTearSheet'

class Widget extends Component{
  render () {
    const {user, push} = this.props
    console.log(plugins.dashboard(user))

    return user.uid ?
      (<div className="col-12">
          {plugins.dashboard(user).map((l,i) => (<MobileTearSheet key={i}>
            <List>
              <Subheader>{i18n.t(l.label)}</Subheader>
              {l.items.map((o, i) => (o ? (<ListItem key={i} onTouchTap={() => push(o.to)} primaryText={i18n.t(o.label)} />) : <Divider key={i}/> ))}
            </List>
          </MobileTearSheet>))}
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
