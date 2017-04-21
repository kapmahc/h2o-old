import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import i18n from 'i18next'

import Application from '../../../layouts/Application'
import Submit from '../../../components/FormSubmitButton'

import {post} from '../../../ajax'
import {signIn} from '../../../actions'
import {TOKEN} from '../../../constants'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    var data = {};
    data[e.target.id] = e.target.value;
    this.setState(data);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {signIn, push} = this.props

    var data = new FormData()
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    post('/api/users/sign-in', data)
      .then(function(rst){
        sessionStorage.setItem(TOKEN, rst.token)
        signIn(rst.token)
        push('/my')
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<Application>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('auth.users.sign-in.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="email">{i18n.t('attributes.email')}</Label>
          <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">{i18n.t('attributes.password')}</Label>
          <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}  />
        </FormGroup>
        <Submit />
      </Form>
    </Application>)
  }
}

Widget.propTypes = {
  push: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push, signIn}
)(Widget)
