import React, { Component } from 'react'
import i18n from 'i18next'
import { Layout } from 'antd'
const { Footer } = Layout

class Widget extends Component {
  render() {
    return (<Footer style={{ textAlign: 'center' }}>
      © {i18n.t('site.copyright')}
    </Footer>)
  }
}

export default Widget
