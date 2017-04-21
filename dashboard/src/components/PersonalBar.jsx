import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18next'

import { Menu } from 'antd'
const SubMenu = Menu.SubMenu;

class Widget extends Component {
  render() {
    // const {user} = this.props
    return (<Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}>
      <Menu.Item>菜单项</Menu.Item>
        <SubMenu title="子菜单">
          <Menu.Item>子菜单项</Menu.Item>
          <Menu.Item>子菜单项</Menu.Item>
          <Menu.Item>子菜单项</Menu.Item>
        </SubMenu>
    </Menu>)
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {}
)(Widget)
