import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

class Widget extends Component{
  render () {
    return (<AppBar
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />)
  }
}

export default Widget
