package vpn

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	rt.POST("/ops/users/change-password", p.Wrap.FORM(&fmUserChangePassword{}, p.changeUserPassword))

	rg := rt.Group("/ops/vpn", p.Jwt.MustAdminMiddleware)
	rg.GET("/readme", p.getReadme)
	rg.GET("/logs", p.Wrap.JSON(p.indexLogs))

	rg.GET("/users", p.Wrap.JSON(p.indexUsers))
	rg.POST("/users", p.Wrap.FORM(&fmUserNew{}, p.createUser))
	rg.POST("/users/:id/info", p.Wrap.FORM(&fmUserEdit{}, p.updateUser))
	rg.POST("/users/:id/password", p.Wrap.FORM(&fmUserResetPassword{}, p.resetUserPassword))
	rg.DELETE("/users/:id", p.Wrap.JSON(p.destroyUser))
}
