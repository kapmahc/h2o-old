import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import i18n from 'i18next'

import FormButtons from '../../../components/FormButtons'
import {post} from '../../../ajax'
import MustSignIn from '../../../components/MustSignIn'


export class Widget extends Component{
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
    post('/users/change-password', data)
      .then(function(rst){
        alert(i18n.t('success'))
        this.setState({currentPassword:'', newPassword:'', passwordConfirmation:''})
      }.bind(this))
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<MustSignIn><div className="col-12">
      <h3>{i18n.t('auth.users.change-password.title')}</h3>
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="currentPassword"
          type="password"
          floatingLabelText={i18n.t("attributes.currentPassword")}
          value={this.state.currentPassword}
          onChange={this.handleChange}
          fullWidth
        />
        <br/>
        <TextField
          id="newPassword"
          type="password"
          floatingLabelText={i18n.t("attributes.newPassword")}
          hintText={i18n.t("helpers.password")}
          value={this.state.newPassword}
          onChange={this.handleChange}
          fullWidth
        />
        <br/>
        <TextField
          id="passwordConfirmation"
          type="password"
          floatingLabelText={i18n.t("attributes.passwordConfirmation")}
          hintText={i18n.t("helpers.passwordConfirmation")}
          value={this.state.passwordConfirmation}
          onChange={this.handleChange}
          fullWidth
        />
        <br/>
        <FormButtons />
      </form>
    </div></MustSignIn>)
  }
}

export default Widget
