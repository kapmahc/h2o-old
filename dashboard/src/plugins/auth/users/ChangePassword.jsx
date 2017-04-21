import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import i18n from 'i18next'

import MustSignIn from '../../../layouts/MustSignIn'
import Submit from '../../../components/FormSubmitButton'

import {post} from '../../../ajax'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPassword:'',
      newPassword:'',
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
    data.append('currentPassword', this.state.currentPassword)
    data.append('newPassword', this.state.newPassword)
    data.append('passwordConfirmation', this.state.passwordConfirmation)
    post('/api/users/change-password', data)
      .then(function(rst){
        alert(i18n.t('success'))
        this.setState({currentPassword:'', newPassword:'', passwordConfirmation:''})
      }.bind(this))
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<MustSignIn>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('auth.users.change-password.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="currentPassword">{i18n.t('attributes.currentPassword')}</Label>
          <Input type="password" name="currentPassword" id="currentPassword" value={this.state.currentPassword} onChange={this.handleChange}  />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">{i18n.t('attributes.newPassword')}</Label>
          <Input type="password" name="newPassword" id="newPassword" value={this.state.newPassword} onChange={this.handleChange}  />
          <FormText color="muted">{i18n.t('helpers.password')}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="passwordConfirmation">{i18n.t('attributes.passwordConfirmation')}</Label>
          <Input type="password" name="passwordConfirmation" id="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}  />
          <FormText color="muted">{i18n.t('helpers.passwordConfirmation')}</FormText>
        </FormGroup>
        <Submit />
      </Form>
    </MustSignIn>)
  }
}

Widget.propTypes = {
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push}
)(Widget)
