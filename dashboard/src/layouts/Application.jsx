import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

class Widget extends Component {
  render() {
    const {children, site} = this.props
    return (<Layout>
      <Header>
        <div className="header-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 10rem' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <hr/>
        ©{site.copyright}
      </Footer>
    </Layout>)
  }
}

Widget.propTypes = {
  site: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default connect(
  state => ({site: state.siteInfo, user: state.currentUser}),
  {push}
)(Widget)
