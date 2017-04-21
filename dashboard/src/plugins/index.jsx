import React from 'react'
import Icon from 'antd'

import auth from './auth'
// import site from './site'
// import reading from './reading'
// import forum from './forum'

const plugins = {
  auth
  // forum,
  // reading,
  // site,
}

export default {
  nonSignInLinks:  [
    {
      to: "/users/sign-in",
      label: "auth.users.sign-in.title",
      icon: <Icon type="login" />
    },
    {
      to: "/users/sign-up",
      label: "auth.users.sign-up.title",
      icon: <Icon type="user-add" />
    },
    {
      to: "/users/forgot-password",
      label: "auth.users.forgot-password.title",
      icon: <Icon type="frown-o" />
    },
    {
      to: "/users/confirm",
      label: "auth.users.confirm.title",
      icon: <Icon type="check-circle-o" />
    },
    {
      to: "/users/unlock",
      label: "auth.users.unlock.title",
      icon: <Icon type="unlock" />
    },
    {
      to: "/leave-words/new",
      label: "site.leave-words.new.title",
      icon: <Icon type="question-circle-o" />
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
