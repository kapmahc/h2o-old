import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NonSignInLinks from '../plugins/auth/users/SharedLinks'

class Widget extends Component{
  render () {
    const {user} = this.props
    return user.id ?
      (<div className="col-12">
        home
      </div>) :
      (<div className="col-12">
        <NonSignInLinks/>
      </div>)
  }
}


Widget.propTypes = {
  push: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {push},
)(Widget)
