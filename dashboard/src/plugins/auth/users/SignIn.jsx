import React, { Component } from 'react'
import i18n from 'i18next'

import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'

import FormButtons from '../../../components/FormButtons'
import SharedLinks from './SharedLinks'

class Widget extends Component {
  render() {
    return (
      <div>
        <form>
          <h2>{i18n.t('auth.users.sign-in.title')}</h2>
          <Divider/>
          <TextField
            hintText="Hint Text"
            floatingLabelText="aaa1"
          />
          <br/>
          <TextField
            hintText="Hint Text"
            floatingLabelText="bbb1"
          />
          <FormButtons />
        </form>
        <br/>
        <SharedLinks />
      </div>)
  }
}

export default Widget
