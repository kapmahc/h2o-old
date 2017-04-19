package vpn

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/plugins/auth"
	"github.com/kapmahc/h2o/web"
)

func (p *Plugin) getReadme(c *gin.Context) {
	data := gin.H{}
	data["user"] = c.MustGet(auth.CurrentUser)
	data["name"] = web.Name()
	data["home"] = web.Backend()
	data["port"] = 1194
	data["network"] = "10.18.0"

	token, err := p.generateToken(10)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	data["token"] = string(token)

	if err := web.Template(c.Writer, "OpenVPN.md", data); err != nil {
		log.Error(err)
	}
}
