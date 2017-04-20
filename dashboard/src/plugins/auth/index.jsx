import {SignIn, SignUp} from './users'

export default {
  routes: [
    {path: "/users/sign-in", component: SignIn},
    {path: "/users/sign-up", component: SignUp}
  ]
}
