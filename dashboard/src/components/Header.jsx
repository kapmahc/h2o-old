import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import i18n from 'i18next'

import LanguageBar from './LanguageBar'
import PersonalBar from './PersonalBar'
import SearchForm from './SearchForm'
import NavBarItem from './NavBarItem'

import plugins from '../plugins'

class Widget extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    const {user, push} = this.props

    return (<Navbar color="inverse" inverse toggleable fixed="top">
      <NavbarToggler right onClick={this.toggle} />
      <NavbarBrand href="/" target="_blank">{i18n.t('site.subTitle')}</NavbarBrand>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {user.uid ? (<NavItem>
            <NavLink onClick={()=>push('/my')}>{i18n.t('header.dashboard')}</NavLink>
          </NavItem>) : null}          
          {plugins.dashboard(user).map((o,i)=>(<NavBarItem key={i} label={o.label} items={o.items} />))}
          <PersonalBar />
          <LanguageBar />
        </Nav>
        <SearchForm />
      </Collapse>
    </Navbar>)
  }
}

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(
  state => ({user: state.currentUser}),
  {push}
)(Widget)
