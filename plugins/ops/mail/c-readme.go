package mail

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) getReadme(c *gin.Context) {
	data := gin.H{}
	c.String(http.StatusOK, "ops-mail-readme", data)
}
