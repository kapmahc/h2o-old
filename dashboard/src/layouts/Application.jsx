import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Container } from 'reactstrap'

import Footer from '../components/Footer'

class Widget extends Component {
  render() {
    const {children} = this.props
    return (<div>
      <Container>
        {children}
        <Footer />
      </Container>
    </div>)
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
