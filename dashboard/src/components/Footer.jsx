import React from 'react'
import i18n from 'i18next'
import { Row, Col } from 'reactstrap'

import {LANGUAGES} from '../constants'

const post = (path) => `/htdocs/${i18n.language}/posts/${path}`

const Widget = () => (<Row>
  <Col md={{size:12}}>
    <hr />
    <footer>
      <p className="float-right">
        {i18n.t("footer.other-languages")}:
        {LANGUAGES.map((o, i)=>(<a style={{marginLeft: "1rem"}} target="_blank" key={i} onClick={()=>i18n.changeLanguage(o)}>{i18n.t(`languages.${o}`)}</a>))}

      </p>
      <p>&copy; {i18n.t('site.copyright')}
        &middot;
        <a href={post('privacy')} target="_blank">{i18n.t("footer.privacy")}</a>
        &middot;
        <a href={post('terms')} target="_blank">{i18n.t("footer.terms")}</a>
        &middot;
        <a href={post('about')} target="_blank">{i18n.t("footer.about")}</a>
      </p>
    </footer>
  </Col>
</Row>)

export default Widget
