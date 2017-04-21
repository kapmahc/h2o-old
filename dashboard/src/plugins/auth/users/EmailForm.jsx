import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import i18n from 'i18next'

import Application from '../../../layouts/Application'
import Submit from '../../../components/FormSubmitButton'

import {post} from '../../../ajax'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
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
    const {action, push} = this.props
    var data = new FormData()
    data.append('email', this.state.email)
    post(`/api/users/${action}`, data)
      .then(function(rst){
        alert(i18n.t(`auth.messages.email-for-${action}`))
        push('/users/sign-in')
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    const {action} = this.props
    return (<Application>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t(`auth.users.${action}.title`)}</h3>
        <hr/>
        <FormGroup>
          <Label for="email">{i18n.t('attributes.email')}</Label>
          <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
        </FormGroup>
        <Submit />
      </Form>
    </Application>)
  }
}

Widget.propTypes = {
  action: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push}
)(Widget)
