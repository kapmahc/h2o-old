package auth

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	rt.GET("/users.html", p.Wrap.HTML("auth/users/index", p.indexUsers))
}
