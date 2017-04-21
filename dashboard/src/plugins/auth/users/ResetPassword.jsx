import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import i18n from 'i18next'

import Application from '../../../layouts/Application'
import Submit from '../../../components/FormSubmitButton'

import {post} from '../../../ajax'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      password:'',
      passwordConfirmation:'',
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
    var data = new FormData()
    const {match, push} = this.props
    data.append('token', match.params.token)
    data.append('password', this.state.password)
    data.append('passwordConfirmation', this.state.passwordConfirmation)
    post('/api/users/reset-password', data)
      .then(function(rst){
        alert(i18n.t('auth.messages.reset-password-success'))
        push('/users/sign-in')
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<Application>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('auth.users.reset-password.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="password">{i18n.t('attributes.password')}</Label>
          <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}  />
          <FormText color="muted">{i18n.t('helpers.password')}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="passwordConfirmation">{i18n.t('attributes.passwordConfirmation')}</Label>
          <Input type="password" name="passwordConfirmation" id="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}  />
          <FormText color="muted">{i18n.t('helpers.passwordConfirmation')}</FormText>
        </FormGroup>
        <Submit />
      </Form>
    </Application>)
  }
}

Widget.propTypes = {
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push}
)(Widget)
