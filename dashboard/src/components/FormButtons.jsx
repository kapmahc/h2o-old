import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ContentClear from 'material-ui/svg-icons/content/clear'
import i18n from 'i18next'

class Widget extends Component{
  render () {
    return (<div>
      <FlatButton
        label={i18n.t('buttons.submit')}
        type="submit"
        icon={<ContentSave />}
        primary />
      <FlatButton
        label={i18n.t('buttons.reset')}
        type="reset"
        icon={<ContentClear />}
        secondary />
    </div>)
  }
}

export default Widget
