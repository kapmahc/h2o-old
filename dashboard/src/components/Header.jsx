import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import i18n from 'i18next'

import LanguageBar from './LanguageBar'
import SearchForm from './SearchForm'

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
    return (<Navbar color="inverse" inverse toggleable fixed="top">
      <NavbarToggler right onClick={this.toggle} />
      <NavbarBrand href="/" target="_blank">{i18n.t('site.subTitle')}</NavbarBrand>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
          </NavItem>
          <LanguageBar />
        </Nav>
        <SearchForm />
      </Collapse>
    </Navbar>)
  }
}

Widget.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {}
)(Widget)
