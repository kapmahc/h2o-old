import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TextField from 'material-ui/TextField'
import i18n from 'i18next'


import FormButtons from '../../../components/FormButtons'
import SharedLinks from './SharedLinks'
import {post} from '../../../ajax'
import {signIn} from '../../../actions'
import {TOKEN, DASHBOARD} from '../../../constants'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:'',
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
    const {signIn, push} = this.props

    var data = new FormData()
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    post('/users/sign-in', data)
      .then(function(rst){
        sessionStorage.setItem(TOKEN, rst.token)
        signIn(rst.token)
        push(DASHBOARD)
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (
      <div className="col-12">
        <form onSubmit={this.handleSubmit}>
          <h3>{i18n.t('auth.users.sign-in.title')}</h3>
          <TextField
            id="email"
            type="email"
            floatingLabelText={i18n.t("attributes.email")}
            value={this.state.email}
            onChange={this.handleChange}
            fullWidth
          />
          <br/>
          <TextField
            id="password"
            type="password"
            floatingLabelText={i18n.t("attributes.password")}
            value={this.state.password}
            onChange={this.handleChange}
            fullWidth
          />
          <br/>
          <FormButtons />
        </form>
        <br/>
        <SharedLinks />
      </div>)
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
}

export default connect(
  state => ({}),
  {push, signIn},
)(Widget)
