import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import i18n from 'i18next'

import Application from './Application'
import Icon from '../components/Icon'

import plugins from '../plugins'

const Widget = ({children, push}) => (<Application>
  <Row>
    <Col md={{size:8, offset:2}}>
      {children}
      <br/>
      <ListGroup>
        {plugins.nonSignInLinks.map((o,i)=>(<ListGroupItem key={i} onClick={()=>push(o.to)} action>
          <Icon name={o.icon}/>
          &nbsp;
          {i18n.t(o.label)}
        </ListGroupItem>))}
      </ListGroup>
    </Col>
  </Row>
</Application>)

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default connect(
  state => ({user: state.currentUser}),
  {push}
)(Widget)
