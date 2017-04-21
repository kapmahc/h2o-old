import React from 'react'
import i18n from 'i18next'
import { Row, Col, Button, ButtonGroup } from 'reactstrap'

import {LANGUAGES} from '../constants'
import PostLink from '../plugins/site/posts/Link'

const Widget = () => (<Row>
  <Col md={{size:12}}>
    <hr />
    <footer>
      <div className="float-right">
        {i18n.t("footer.other-languages")}:
        <ButtonGroup>
        {LANGUAGES.map((o, i)=>(<Button
          color="link"
          size="sm"
          key={i}
          onClick={()=>{
            i18n.changeLanguage(o)
            location.reload()
          }}>
          {i18n.t(`languages.${o}`)}
        </Button>))}
        </ButtonGroup>
      </div>
      <p>&copy; {i18n.t('site.copyright')}
        &middot;
        <PostLink name="privacy" label="footer.privacy"/>
        &middot;
        <PostLink name="terms" label="footer.terms"/>
        &middot;
        <PostLink name="about" label="footer.about"/>
      </p>
    </footer>
  </Col>
</Row>)

export default Widget
