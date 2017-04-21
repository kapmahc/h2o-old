import React, { Component } from 'react'
import i18n from 'i18next'

class Widget extends Component{
  render () {
    const {location} = this.props
    return (<div className="col-12">
      <h3>{i18n.t('errors.not-found')} <code>{location.pathname}</code></h3>
    </div>)
  }
}

export default Widget
