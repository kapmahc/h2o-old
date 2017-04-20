import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TextField from 'material-ui/TextField'
import i18n from 'i18next'

import FormButtons from '../../../components/FormButtons'
import {post} from '../../../ajax'
import {toggleStatusBar} from '../../../actions'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',
      email:'',
      password:'',
      passwordConfirmation:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    var data = {}
    data[e.target.id] = e.target.value
    this.setState(data)
  }
  handleSubmit(e) {
    const {push, toggleStatusBar} = this.props
    e.preventDefault();
    var data = new FormData()
    data.append('name', this.state.name)
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    data.append('passwordConfirmation', this.state.passwordConfirmation)
    post('/users/sign-up', data)
      .then(function(rst){
        push('/users/sign-in')
        toggleStatusBar(i18n.t('auth.messages.email-for-confirm'))
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<div className="col-12">
      <form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('auth.users.sign-up.title')}</h3>
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
          hintText={i18n.t("helpers.password")}
          value={this.state.password}
          onChange={this.handleChange}
          fullWidth
        />
        <br/>
        <TextField
          id="passwordConfirmation"
          type="passwordConfirmation"
          floatingLabelText={i18n.t("attributes.passwordConfirmation")}
          hintText={i18n.t("helpers.passwordConfirmation")}
          value={this.state.passwordConfirmation}
          onChange={this.handleChange}
          fullWidth
        />
        <br/>
        <FormButtons />
      </form>
    </div>)
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  toggleStatusBar: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push, toggleStatusBar},
)(Widget)
