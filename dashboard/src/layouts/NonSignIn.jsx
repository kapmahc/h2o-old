import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Layout, Row, Col  } from 'antd'
const { Content } = Layout

import Footer from '../components/Footer'
import Header from '../components/Header'

class Widget extends Component {
  render() {
    const {children} = this.props
    return (<Layout>
      <Header />
      <Content>
        <Row>
          <Col offset={4} span={16}>{children}</Col>
        </Row>
        <Row>
          <Col offset={6} span={8}>
            <ul>
              <li>aaa</li>
              <li>bbb</li>
            </ul>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>)
  }
}

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {push}
)(Widget)
