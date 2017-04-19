package mail

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/web"
)

func (p *Plugin) getReadme(c *gin.Context) {
	data := gin.H{}

	if err := web.Template(c.Writer, "Postfix-Dovecot-PostgreSQL.md", data); err != nil {
		log.Error(err)
	}
}
