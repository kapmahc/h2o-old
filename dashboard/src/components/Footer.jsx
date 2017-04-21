import React from 'react'
import i18n from 'i18next'
import { Row, Col } from 'reactstrap'

const Widget = () => (<Row>
  <Col md={{size:12}}>
    <hr />
    <footer>
      <p className="float-right"><a href="#">Back to top</a></p>
      <p>&copy; {i18n.t('site.copyright')}
        &middot;
        <a href="/htdocs/posts/privacy" target="_blank">{i18n.t("footer.privacy")}</a>
        &middot;
        <a href="/htdocs/posts/terms" target="_blank">{i18n.t("footer.terms")}</a>
        &middot;
        <a href="/htdocs/posts/about" target="_blank">{i18n.t("footer.about")}</a>
      </p>
    </footer>
  </Col>
</Row>)

export default Widget
