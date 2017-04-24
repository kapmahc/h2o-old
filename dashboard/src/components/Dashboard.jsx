import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Row, Col, Card, CardTitle, CardBlock, ListGroup, ListGroupItem } from 'reactstrap'
import i18n from 'i18next'

import MustSignIn from '../layouts/MustSignIn'
import Icon from '../components/Icon'
import plugins from '../plugins'

const Widget = ({user, push}) => (<MustSignIn>
  <Row>
    {plugins.dashboard(user).map((d, j)=>(<Col sm="6" key={j}>
      <Card className="block">
        <CardBlock>
          <CardTitle>
            <Icon name={d.icon}/> {i18n.t(d.label)}
            </CardTitle>
        </CardBlock>
        <ListGroup className="list-group-flush">
          {d.items.filter((o)=>o!=null).map((o, i)=>(<ListGroupItem key={i} onClick={()=>push(o.to)} action>
            {i18n.t(o.label)}
          </ListGroupItem>))}
        </ListGroup>
      </Card>
    </Col>))}
  </Row>
</MustSignIn>)

Widget.propTypes = {
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(
  state => ({user: state.currentUser}),
  {push}
)(Widget)
