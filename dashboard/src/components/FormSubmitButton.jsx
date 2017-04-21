import React from 'react'
import { Button } from 'reactstrap'
import i18n from 'i18next'

const Widget = () => (<Button color="primary">{i18n.t('buttons.submit')}</Button>)

export default Widget
