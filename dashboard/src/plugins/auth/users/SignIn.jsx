import React, { Component } from 'react'
import i18n from 'i18next'
import TextField from 'material-ui/TextField'


import FormButtons from '../../../components/FormButtons'
import SharedLinks from './SharedLinks'

class Widget extends Component {
  render() {
    return (
      <div className="col-12">
        <form>
          <h3>{i18n.t('auth.users.sign-in.title')}</h3>
          <TextField
            type="email"
            floatingLabelText={i18n.t("attributes.email")}
            fullWidth
          />
          <br/>
          <TextField
            type="password"
            floatingLabelText={i18n.t("attributes.password")}
            fullWidth
          />
          <FormButtons />
        </form>
        <br/>
        <SharedLinks />
      </div>)
  }
}

export default Widget
