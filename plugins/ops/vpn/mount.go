package vpn

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(_ *gin.RouterGroup, api *gin.RouterGroup) {
	api.PUT("/ops/vpn/users/change-password", p.Wrap.FORM(&fmUserChangePassword{}, p.changeUserPassword))

	ug := api.Group("/ops/vpn/remote", p.tokenMiddleware)
	ug.POST("/auth", p.Wrap.FORM(&fmSignIn{}, p.postRemoteAuth))
	ug.POST("/connect", p.Wrap.FORM(&fmStatus{}, p.postRemoteConnect))
	ug.POST("/disconnect", p.Wrap.FORM(&fmStatus{}, p.postRemoteDisconnect))

	rg := api.Group("/ops/vpn", p.Jwt.MustAdminMiddleware)
	rg.GET("/readme", p.getReadme)
	rg.GET("/logs", p.Wrap.JSON(p.indexLogs))

	rg.GET("/users", p.Wrap.JSON(p.indexUsers))
	rg.POST("/users", p.Wrap.FORM(&fmUserNew{}, p.createUser))
	rg.POST("/users/:id/info", p.Wrap.FORM(&fmUserEdit{}, p.updateUser))
	rg.POST("/users/:id/password", p.Wrap.FORM(&fmUserResetPassword{}, p.resetUserPassword))
	rg.DELETE("/users/:id", p.Wrap.JSON(p.destroyUser))
}
