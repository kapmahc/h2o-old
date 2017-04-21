import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import i18n from 'i18next'

import Icon from '../components/Icon'

import plugins from '../plugins'

const Widget = ({children, push, user}) => (<Container>
  {
    user.uid ?
      children :
      (<Row>
        <Col md={{size:8, offset:2}}>
          {children}
          <br/>
          <ListGroup>
            {plugins.nonSignInLinks.filter((o)=> o!=null ).map((o,i)=>(<ListGroupItem key={i} onClick={()=>push(o.to)} action>
              <Icon name={o.icon}/>
              &nbsp;
              {i18n.t(o.label)}
            </ListGroupItem>))}
          </ListGroup>
        </Col>
      </Row>)
  }
</Container>)

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}


export default connect(
  state => ({user: state.currentUser}),
  {push}
)(Widget)
