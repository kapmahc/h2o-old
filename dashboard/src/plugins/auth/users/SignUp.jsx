import React, { Component } from 'react'
import i18n from 'i18next'

import Divider from 'material-ui/Divider'

import FormButtons from '../../../components/FormButtons'
import SharedLinks from './SharedLinks'

class Widget extends Component {
  render() {
    return (<div>
      <form>
        <h2>{i18n.t('auth.users.sign-up.title')}</h2>
        <Divider/>
        <FormButtons />
      </form>
      <br/>
      <SharedLinks />
    </div>)
  }
}

export default Widget
