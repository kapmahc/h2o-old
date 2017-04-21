import React from 'react'
import { Alert } from 'reactstrap'
import i18n from 'i18next'

import Application from '../layouts/Application'

const Widget = () => (<Application>
  <Alert color="warning">
    <strong>{i18n.t('errors.not-found')}:</strong> {location.href}
  </Alert>
</Application>)

export default Widget
