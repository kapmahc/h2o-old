import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import i18n from 'i18next'

import MustAdmin from '../../../layouts/MustAdmin'
import Submit from '../../../components/FormSubmitButton'

import {post, get} from '../../../ajax'

class Widget extends Component {
  constructor(props){
   super(props)
   this.state = {
     host: '',
     port: 25,
     username: '',
     ssl: false,
     password: '',
     passwordConfirmation: '',
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount() {
   get('/api/admin/site/smtp').then(
     function(rst){
       this.setState(rst)
     }.bind(this)
   );
 }
 handleChange(e) {
   var data = {};
   var t = e.target;
   data[t.id] = t.type === 'checkbox' ? t.checked : t.value;
   this.setState(data);
 }
 handleSubmit(e) {
   e.preventDefault();
   var data = new FormData()
   data.append('host', this.state.host)
   data.append('port', this.state.port)
   data.append('username', this.state.username)
   data.append('password', this.state.password)
   data.append('passwordConfirmation', this.state.passwordConfirmation)
   data.append('ssl', this.state.ssl)
   post('/api/admin/site/smtp', data)
     .then(function(rst){
       alert(i18n.t('success'))
     })
     .catch((err) => {
       alert(err)
     })
 }
  render() {
    return (<MustAdmin>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('site.admin.author.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="host">{i18n.t('attributes.host')}</Label>
          <Input type="text" name="host" id="host" value={this.state.host} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="port">{i18n.t('attributes.port')}</Label>
          <Input type="select" name="port" id="port" value={this.state.port} onChange={this.handleChange}>
            {[25, 465, 587].map((o,i)=>(<option value={o} key={i}>{o}</option>))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="username">{i18n.t('site.admin.smtp.sender')}</Label>
          <Input type="email" name="username" id="username" value={this.state.username} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">{i18n.t('attributes.password')}</Label>
          <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          <FormText color="muted">{i18n.t('helpers.password')}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="passwordConfirmation">{i18n.t('attributes.passwordConfirmation')}</Label>
          <Input type="password" name="passwordConfirmation" id="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}  />
          <FormText color="muted">{i18n.t('helpers.passwordConfirmation')}</FormText>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox"  name="ssl" id="ssl" checked={this.state.ssl} onChange={this.handleChange} />
            {i18n.t('attributes.ssl')}
          </Label>
        </FormGroup>
        <Submit />
      </Form>
    </MustAdmin>)
  }
}

export default Widget
