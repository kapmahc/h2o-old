import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import i18n from 'i18next'

import {get} from '../../../ajax'
import MustSignIn from '../../../components/MustSignIn'

class Widget extends Component {
  constructor(props){
    super(props)
    this.state = {items:[]}
  }
  componentDidMount(){
    get('/users/logs').then(
      function(rst){
        this.setState({items: rst})
      }.bind(this)
    );
  }
  render(){
    return (<MustSignIn>
      <div className="col-12">
        <h3>{i18n.t('auth.users.logs.title')}</h3>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>{i18n.t('attributes.createdAt')}</TableHeaderColumn>
              <TableHeaderColumn>IP</TableHeaderColumn>
              <TableHeaderColumn>{i18n.t('auth.attributes.log.message')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.items.map((o, i) => (<TableRow key={i}>
              <TableRowColumn>{o.createdAt}</TableRowColumn>
              <TableRowColumn>{o.ip}</TableRowColumn>
              <TableRowColumn>{o.message}</TableRowColumn>
            </TableRow>))}
          </TableBody>
        </Table>
      </div>
    </MustSignIn>)
  }
}


Widget.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(
  state => ({user: state.currentUser})
)(Widget)
