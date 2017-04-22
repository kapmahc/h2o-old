import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import i18n from 'i18next'

import plugins from '../plugins'
import {signOut} from '../actions'
import {_delete} from '../ajax'

class Widget extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  render () {
    const {push, user, signOut} = this.props
    var items = user.uid ? [
        {label: 'personal-bar.dashboard', to: '/my'},
        null,
        {
          label: 'personal-bar.sign-out',
          on: ()=>{
            if(confirm(i18n.t('are-you-sure'))){
              _delete('/api/users/sign-out')
              push('/users/sign-in')
              sessionStorage.clear();
              signOut()
            }
          }
        },
      ] : plugins.nonSignInLinks

    return (<NavDropdown isOpen={this.state.open} toggle={this.toggle}>
      <DropdownToggle nav caret>
        {user.uid ? i18n.t('personal-bar.welcome', {name:user.name}) : i18n.t('personal-bar.sign-in-or-up')}
      </DropdownToggle>
      <DropdownMenu>
        {items.map((o, i)=>o ? (<DropdownItem
          key={i}
          onClick={()=>{
            if(o.on){
              o.on()
            }else{
              push(o.to)
            }
          }}>
          {i18n.t(o.label)}
        </DropdownItem>) : <DropdownItem divider key={i} />)}
      </DropdownMenu>
    </NavDropdown>)
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(
  state => ({user: state.currentUser}),
  {push, signOut}
)(Widget)
