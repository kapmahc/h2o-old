import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import i18n from 'i18next'

import MustAdmin from '../../../layouts/MustAdmin'
import Submit from '../../../components/FormSubmitButton'

import {post, get} from '../../../ajax'

class Widget extends Component {
  constructor(props){
   super(props)
   this.state = {
     name:'',
     email:'',
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount() {
   get('/api/site/info').then(
     function(rst){
       this.setState(rst.author)
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
   data.append('email', this.state.email)
   post('/api/admin/site/author', data)
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
          <Label for="name">{i18n.t('site.attributes.author.name')}</Label>
          <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email">{i18n.t('site.attributes.author.email')}</Label>
          <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
        </FormGroup>
        <Submit />
      </Form>
    </MustAdmin>)
  }
}

export default Widget
