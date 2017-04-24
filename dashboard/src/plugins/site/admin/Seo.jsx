import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import i18n from 'i18next'

import MustAdmin from '../../../layouts/MustAdmin'
import Submit from '../../../components/FormSubmitButton'

import {post, get} from '../../../ajax'
import {LANGUAGES} from '../../../constants'

class Widget extends Component {
  constructor(props){
   super(props)
   this.state = {
     googleVerifyCode: '',
     baiduVerifyCode: '',
   }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount() {
   get('/api/admin/site/seo').then(
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
   data.append('googleVerifyCode', this.state.googleVerifyCode)
   data.append('baiduVerifyCode', this.state.baiduVerifyCode)
   post('/api/admin/site/seo', data)
     .then(function(rst){
       alert(i18n.t('success'))
     })
     .catch((err) => {
       alert(err)
     })
 }
  render() {
    const {googleVerifyCode, baiduVerifyCode} = this.state
    return (<MustAdmin>
      <Form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('site.admin.seo.title')}</h3>
        <hr/>
        <FormGroup>
          <Label for="googleVerifyCode">{i18n.t('site.admin.seo.googleVerifyCode')}</Label>
          <Input type="text" name="googleVerifyCode" id="googleVerifyCode" value={googleVerifyCode} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="baiduVerifyCode">{i18n.t('site.admin.seo.baiduVerifyCode')}</Label>
          <Input type="text" name="baiduVerifyCode" id="baiduVerifyCode" value={baiduVerifyCode} onChange={this.handleChange} />
        </FormGroup>
        <Submit />
      </Form>
      <br/>
      <ListGroup>
        {LANGUAGES.map((o)=>`rss-${o}.atom`).concat(['robots.txt', 'sitemap.xml.gz', `google${googleVerifyCode}.html`, `baidu_verify_${baiduVerifyCode}.html`]).map((o,i)=>(<ListGroupItem onClick={()=>window.open(`/${o}`)} key={i} action>{o}</ListGroupItem>))}      
      </ListGroup>
    </MustAdmin>)
  }
}

export default Widget
