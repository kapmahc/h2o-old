import React from 'react'

import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import EmailForm from './users/EmailForm'
import ResetPassword from './users/ResetPassword'
import Logs from './users/Logs'
import Info from './users/Info'
import ChangePassword from './users/ChangePassword'

const Confirm = () => (<EmailForm action="confirm"/>)
const Unlock = () => (<EmailForm action="unlock"/>)
const ForgotPassword = () => (<EmailForm action="forgot-password"/>)

export default {
  dashboard (user){
    var items = []
    if (user.uid) {
      items.push({
        label: "auth.dashboard.title",
        icon: "person",
        items: [
          {
            label: "auth.users.info.title",
            to: "/users/info",
            icon: "info_outline"
          },
          {
            label: "auth.users.change-password.title",
            to: "/users/change-password",
            icon: "vpn_key"
          },
          {
            label: "auth.users.logs.title",
            to: "/users/logs",
            icon: "date_range"
          },
        ]
      })
    }
    return items
  },
  routes: [
    {path: "/users/sign-in", component: SignIn},
    {path: "/users/sign-up", component: SignUp},
    {path: "/users/forgot-password", component: ForgotPassword},
    {path: "/users/confirm", component: Confirm},
    {path: "/users/unlock", component: Unlock},
    {path: "/users/reset-password/:token", component: ResetPassword},
    {path: "/users/logs", component: Logs},
    {path: "/users/info", component: Info},
    {path: "/users/change-password", component: ChangePassword},
  ]
}
