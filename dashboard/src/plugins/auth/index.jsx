import React from 'react'

import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import EmailForm from './users/EmailForm'

const Confirm = () => (<EmailForm action="confirm"/>)
const Unlock = () => (<EmailForm action="unlock"/>)
const ForgotPassword = () => (<EmailForm action="forgot-password"/>)

export default {
  routes: [
    {path: "/users/sign-in", component: SignIn},
    {path: "/users/sign-up", component: SignUp},
    {path: "/users/forgot-password", component: ForgotPassword},
    {path: "/users/confirm", component: Confirm},
    {path: "/users/unlock", component: Unlock},
  ]
}
