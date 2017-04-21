import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import ContentSave from 'material-ui/svg-icons/content/save'
// import ContentClear from 'material-ui/svg-icons/content/clear'
import i18n from 'i18next'

// <FlatButton
//   label={i18n.t('buttons.reset')}
//   type="reset"
//   icon={<ContentClear />}
//   secondary />

class Widget extends Component{
  render () {
    return (<FlatButton
      label={i18n.t('buttons.submit')}
      type="submit"
      icon={<ContentSave />}
      primary />)
  }
}

export default Widget
