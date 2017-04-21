import React from 'react'

import SocialPersonal from 'material-ui/svg-icons/social/person'

import NewLeaveWord from './leave-words/New'


export default {
  dashboard (user){
    var items = []
    if (user.isAdmin) {
      items.push({
        label: "site.dashboard.title",
        icon: <SocialPersonal />,
        items: [
          {label: "auth.users.info.title", to: "/users/info"},
          {label: "auth.users.change-password.title", to: "/users/change-password"},
          {label: "auth.users.logs.title", to: "/users/logs"},
        ]
      })
    }
    return items
  },
  routes: [
    {path: "/leave-words/new", component: NewLeaveWord},
  ]
}
