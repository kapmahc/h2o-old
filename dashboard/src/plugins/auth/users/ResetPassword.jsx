import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TextField from 'material-ui/TextField'
import i18n from 'i18next'

import FormButtons from '../../../components/FormButtons'
import {post} from '../../../ajax'
import SharedLinks from './SharedLinks'
import {toggleStatusBar} from '../../../actions'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
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
    e.preventDefault()
    const {push, match, toggleStatusBar} = this.props
    var data = new FormData()
    data.append('password', this.state.password)
    data.append('passwordConfirmation', this.state.passwordConfirmation)
    data.append('token', match.params.token)
    post('/users/reset-password', data)
      .then(function(rst){
        push('/users/sign-in')
        toggleStatusBar(i18n.t('auth.messages.reset-password-success'))
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (<div className="col-12">
      <form onSubmit={this.handleSubmit}>
        <h3>{i18n.t('auth.users.reset-password.title')}</h3>
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
      <br/>
      <SharedLinks />
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
