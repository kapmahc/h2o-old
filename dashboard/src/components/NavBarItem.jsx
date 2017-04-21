import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import i18n from 'i18next'

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
    const {push, label, items} = this.props
    return (<NavDropdown isOpen={this.state.open} toggle={this.toggle}>
      <DropdownToggle nav caret>
        {i18n.t(label)}
      </DropdownToggle>
      <DropdownMenu>
        {items.map((o, i)=>o ? (<DropdownItem
          key={i}
          onClick={()=>{
            push(o.to)
          }}>
          {i18n.t(o.label)}
        </DropdownItem>) : <DropdownItem divider key={i} />)}
      </DropdownMenu>
    </NavDropdown>)
  }
}


Widget.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
}

export default connect(
  state => ({}),
  {push}
)(Widget)
