import React, { Component } from 'react'
import { NavDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap'
import i18n from 'i18next'

import {LANGUAGES} from '../constants'

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
    return (<NavDropdown isOpen={this.state.open} toggle={this.toggle}>
      <DropdownToggle nav caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        {LANGUAGES.map((o, i)=>(<DropdownItem key={i}>{i18n.t(`languages.${o}`)}</DropdownItem>))}
      </DropdownMenu>
    </NavDropdown>)
  }
}

export default Widget
