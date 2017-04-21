import React from 'react'
import i18n from 'i18next'
import { Button, Input } from 'reactstrap'

const Widget = () => (<form className="form-inline my-2 my-lg-0">
  <Input className="mr-sm-2" type="text" name="keywords" placeholder={i18n.t('hints.search')} />
  <Button className="my-2 my-sm-0" outline color="success">{i18n.t('buttons.search')}</Button>
</form>)

export default Widget
