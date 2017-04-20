import React from 'react'

import SocialPersonalAdd from 'material-ui/svg-icons/social/person-add'
import HardwareSecurity from 'material-ui/svg-icons/hardware/security'
import ActionFindReplace from 'material-ui/svg-icons/action/find-replace'
import ActionBugReport from 'material-ui/svg-icons/action/bug-report'
import NotificationConfirmationNumber from 'material-ui/svg-icons/notification/confirmation-number'
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open'

import auth from './auth'
// import site from './site'
// import blog from './blog'
// import reading from './reading'
// import forum from './forum'

const plugins = {
  // forum,
  // reading,
  // site,
  auth
}

export default {
  nonSignInLinks:  [
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
  ],
  dashboard(user) {
    return Object.keys(plugins).reduce((a, k) => {
      return a.concat(plugins[k].dashboard(user))
    }, [])
  },
  routes: Object.keys(plugins).reduce((a, k) => {
    return a.concat(plugins[k].routes)
  }, [])
};
