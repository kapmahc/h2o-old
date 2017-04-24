import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import i18n from 'i18next'

import MustSignIn from '../../../layouts/MustSignIn'
import {get} from '../../../ajax'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {items:[]}
  }
  componentDidMount() {
    get('/api/users/logs').then(
      function(rst){
        this.setState({items:rst})
      }.bind(this)
    );
  }
  render() {
    return (<MustSignIn>
      <h3>{i18n.t('auth.users.logs.title')}</h3>
      <hr/>
      <ListGroup>
        {this.state.items.map((o, i)=>(<ListGroupItem key={i} action>[{o.ip}] {o.createdAt}: {o.message}</ListGroupItem>))}
      </ListGroup>
    </MustSignIn>)
  }
}

export default Widget
