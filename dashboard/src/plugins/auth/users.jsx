import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class SignIn extends Component {
  render() {
    return (<div>
      sign in
      <br/>
      <ul>
      <li>
        <Link to="/users/sign-in">Sign in</Link>
      </li>
      <li>
        <Link to="/users/sign-up">Sign up</Link>
      </li>
      </ul>
    </div>)
  }
}

export class SignUp extends Component {
  render() {
    return (<div>
      sign up
      <br/>
      <ul>
      <li>
        <Link to="/users/sign-in">Sign in</Link>
      </li>
      <li>
        <Link to="/users/sign-up">Sign up</Link>
      </li>
      <li>
        <Link to="/">home</Link>
      </li>
      </ul>
    </div>)
  }
}
