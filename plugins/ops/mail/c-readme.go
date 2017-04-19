package mail

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/web"
)

func (p *Plugin) getReadme(c *gin.Context) {
	data := gin.H{}
	web.Template(c.Writer, "Postfix-Dovecot-PostgreSQL.md", data)
}
