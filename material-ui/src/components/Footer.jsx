import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import i18n from 'i18next'

class Widget extends Component{
  render () {
    return (<div style={{margin: "2rem auto"}}>
      <Divider />
      <div style={{display: "table", margin: "1rem auto"}}>
        &copy;{i18n.t('site.copyright')}
      </div>
    </div>)
  }
}

export default Widget
