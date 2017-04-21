import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import i18n from 'i18next'

import FormButtons from '../../../components/FormButtons'
import {post, get} from '../../../ajax'
import MustSignIn from '../../../components/MustSignIn'

export class Widget extends Component{
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
    get('/users/info').then(
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
    post('/users/info', data)
      .then(function(rst){
        alert(i18n.t('success'))
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<MustSignIn>
      <div className="col-12">
        <h3>{i18n.t('auth.users.info.title')}</h3>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="name"
            floatingLabelText={i18n.t("attributes.fullName")}
            value={this.state.name}
            onChange={this.handleChange}
            fullWidth
          />
          <br/>
          <TextField
            id="email"
            floatingLabelText={i18n.t("attributes.email")}
            value={this.state.email}
            disabled
            fullWidth
          />
          <br/>
          <TextField
            id="logo"
            floatingLabelText={i18n.t("auth.attributes.user.logo")}
            value={this.state.logo}
            onChange={this.handleChange}
            fullWidth
          />
          <br/>
          <TextField
            id="home"
            floatingLabelText={i18n.t("auth.attributes.user.home")}
            value={this.state.home}
            onChange={this.handleChange}
            fullWidth
          />
          <br/>
          <FormButtons />
        </form>
      </div>
    </MustSignIn>)
  }
}

export default Widget
