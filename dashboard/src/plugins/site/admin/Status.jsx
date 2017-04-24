import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem, Row, Col, Card, CardBlock, CardTitle } from 'reactstrap'
import i18n from 'i18next'

import MustAdmin from '../../../layouts/MustAdmin'
import {get} from '../../../ajax'

const StatusCard = ({action, items}) => (
  <Col sm="6" className="block">
    <Card>
      <CardBlock>
        <CardTitle>{i18n.t(`site.admin.status.${action}`)}</CardTitle>
      </CardBlock>
      <ListGroup className="list-group-flush">
        {items.map((o, i)=>(<ListGroupItem key={i} action>
          {o}
        </ListGroupItem>))}
      </ListGroup>
    </Card>
  </Col>)

StatusCard.propTypes = {
  action: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {
      routes: [],
      os: {},
      database: {},
      network: {},
      jobs: {},
      cache: '',
    }
  }
  componentDidMount() {
    get('/api/admin/site/status').then(
      function(rst){
        this.setState(rst)
      }.bind(this)
    );
  }
  render() {
    const {routes, os, database, network, jobs, cache} = this.state
    return (<MustAdmin>
      <Row>
        <StatusCard action="os" items={Object.keys(os).map((k)=>`${k}: ${os[k]}`)}/>
        <StatusCard action="database" items={Object.keys(database).map((k)=>`${k}: ${database[k]}`)}/>
        <StatusCard action="network" items={Object.keys(network).map((k)=>`${k}: ${network[k]}`)}/>
        <StatusCard action="jobs" items={Object.keys(jobs).map((k)=>`${k}: ${jobs[k]}`)}/>
        <StatusCard action="routes" items={routes.map((o)=>`${o.Method}: ${o.Path}`)}/>
        <StatusCard action="cache" items={cache.split('\n')}/>        
      </Row>
    </MustAdmin>)
  }
}

Widget.propTypes = {
  push: PropTypes.func.isRequired
}

export default connect(
  state => ({}),
  {push}
)(Widget)
