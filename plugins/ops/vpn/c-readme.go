package vpn

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/plugins/auth"
	"github.com/kapmahc/h2o/web"
	"github.com/spf13/viper"
)

func (p *Plugin) getReadme(c *gin.Context) {
	data := gin.H{}
	data["user"] = c.MustGet(auth.CurrentUser)
	data["name"] = viper.Get("server.name")
	data["home"] = web.Backend()
	data["port"] = 1194
	data["network"] = "10.18.0"

	token, err := p.generateToken(10)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	data["token"] = string(token)
	c.HTML(http.StatusOK, "ops-vpn-readme", data)
}
