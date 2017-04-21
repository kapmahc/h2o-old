import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import i18n from 'i18next'

import MustSignIn from '../../../layouts/MustSignIn'
import Submit from '../../../components/FormSubmitButton'

import {post, get} from '../../../ajax'

class Widget extends Component {
  constructor(props){
   super(props)
   this.state = {
     name:'',
     home:'',
     logo:'',
     email: '',
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount() {
   get('/api/users/info').then(
     function(rst){
       this.setState(rst)
     }.bind(this)
   );
 }
 handleChange(e) {
   var data = {};
   data[e.target.id] = e.target.value;
   this.setState(data);
 }
 handleSubmit(e) {
   e.preventDefault();
   var data = new FormData()
   data.append('name', this.state.name)
   data.append('home', this.state.home)
   data.append('logo', this.state.logo)
   post('/api/users/info', data)
     .then(function(rst){
       alert(i18n.t('success'))
     })
     .catch((err) => {
       alert(err)
     })
 }
  render() {
    return (<MustSignIn>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('auth.users.info.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="name">{i18n.t('attributes.fullName')}</Label>
          <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email">{i18n.t('attributes.email')}</Label>
          <Input disabled type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="home">{i18n.t('auth.attributes.user.home')}</Label>
          <Input type="text" name="home" id="home" value={this.state.home} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="logo">{i18n.t('auth.attributes.user.logo')}</Label>
          <Input type="text" name="logo" id="logo" value={this.state.logo} onChange={this.handleChange} />
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
