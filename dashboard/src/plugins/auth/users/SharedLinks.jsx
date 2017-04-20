import React, { Component } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {List, ListItem} from 'material-ui/List'
import SocialPersonalAdd from 'material-ui/svg-icons/social/person-add'
import HardwareSecurity from 'material-ui/svg-icons/hardware/security'
import ActionFindReplace from 'material-ui/svg-icons/action/find-replace'
import ActionBugReport from 'material-ui/svg-icons/action/bug-report'
import NotificationConfirmationNumber from 'material-ui/svg-icons/notification/confirmation-number'
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open'

import i18n from 'i18next'

class Widget extends Component {  
  render(){
    const {push} = this.props
    const items = [
      {
        to: "/users/sign-in",
        label: "auth.users.sign-in.title",
        icon: <HardwareSecurity />
      },
      {
        to: "/users/sign-up",
        label: "auth.users.sign-up.title",
        icon: <SocialPersonalAdd />
      },
      {
        to: "/users/forgot-password",
        label: "auth.users.forgot-password.title",
        icon: <ActionFindReplace />
      },
      {
        to: "/users/confirm",
        label: "auth.users.confirm.title",
        icon: <NotificationConfirmationNumber />
      },
      {
        to: "/users/unlock",
        label: "auth.users.unlock.title",
        icon: <ActionLockOpen />
      },
      {
        to: "/leave-words/new",
        label: "site.leave-words.new.title",
        icon: <ActionBugReport />
      }
    ]
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
