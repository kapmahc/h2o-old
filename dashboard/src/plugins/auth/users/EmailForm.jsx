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
      email:'',
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
    const {action, push, toggleStatusBar} = this.props
    var data = new FormData()
    data.append('email', this.state.email)
    post(`/users/${action}`, data)
      .then(function(rst){
        push('/users/sign-in')
        toggleStatusBar(i18n.t(`auth.messages.email-for-${action}`))        
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    const {action} = this.props
    return (<div className="col-12">
      <form onSubmit={this.handleSubmit}>
        <h3>{i18n.t(`auth.users.${action}.title`)}</h3>
        <TextField
          id="email"
          type="email"
          floatingLabelText={i18n.t("attributes.email")}
          value={this.state.email}
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
  action: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push, toggleStatusBar}
)(Widget)
