import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Application from '../../../layouts/Application'

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
    var data = new FormData()
    data.append('email', this.state.email)
  }
  render() {
    const {action} = this.props
    return (<Application>
      <form onSubmit={this.handleSubmit}>
        {action}
      </form>
    </Application>)
  }
}

Widget.propTypes = {
  action: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push}
)(Widget)
