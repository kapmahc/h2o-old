import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18next'

import { Layout, Menu } from 'antd'
const { Header } = Layout

import PersonalBar from './PersonalBar'

class Widget extends Component {
  render() {
    const {user} = this.props
    var items = []
    if(user.uid) {
      if(user.isAdmin) {

      }
    }else{
      items.push({label: "auth.errors.please-sign-in"})
    }
    return (<Header>
      <div className="header-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        {items.map((o, i) => <Menu.Item key={i}>{i18n.t(o.label)}</Menu.Item>)}        
      </Menu>
    </Header>)
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {}
)(Widget)
