import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class SignIn extends Component {
  render() {
    return (<div>
      sign in
      <br/>
      <Link to="/users/sign-up">Sign up</Link>
    </div>)
  }
}

export class SignUp extends Component {
  render() {
    return (<div>
      sign up
    </div>)
  }
}
