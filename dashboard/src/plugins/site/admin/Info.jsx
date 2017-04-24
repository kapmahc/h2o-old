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
     title:'',
     subTitle:'',
     keywords:'',
     description: '',
     copyright: '',
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount() {
   get('/api/site/info').then(
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
   data.append('title', this.state.title)
   data.append('subTitle', this.state.subTitle)
   data.append('keywords', this.state.keywords)
   data.append('description', this.state.description)
   data.append('copyright', this.state.copyright)
   post('/api/admin/site/info', data)
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
        <h3>{i18n.t('site.admin.info.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="title">{i18n.t('site.attributes.title')}</Label>
          <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="subTitle">{i18n.t('site.attributes.subTitle')}</Label>
          <Input type="text" name="subTitle" id="subTitle" value={this.state.subTitle} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="keywords">{i18n.t('site.attributes.keywords')}</Label>
          <Input type="text" name="keywords" id="keywords" value={this.state.keywords} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">{i18n.t('site.attributes.description')}</Label>
          <Input rows={6} type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="copyright">{i18n.t('site.attributes.copyright')}</Label>
          <Input type="text" name="copyright" id="copyright" value={this.state.copyright} onChange={this.handleChange} />
        </FormGroup>
        <Submit />
      </Form>
    </MustAdmin>)
  }
}

export default Widget
