package mail

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(_ *gin.RouterGroup, api *gin.RouterGroup) {
	api.PUT("/ops/mail/users/change-password", p.Wrap.FORM(&fmUserChangePassword{}, p.changeUserPassword))

	rg := api.Group("/ops/mail", p.Jwt.MustAdminMiddleware)
	rg.GET("/readme", p.getReadme)

	rg.GET("/users", p.Wrap.JSON(p.indexUsers))
	rg.POST("/users", p.Wrap.FORM(&fmUserNew{}, p.createUser))
	rg.POST("/users/:id/info", p.Wrap.FORM(&fmUserEdit{}, p.updateUser))
	rg.POST("/users/:id/password", p.Wrap.FORM(&fmUserResetPassword{}, p.resetUserPassword))
	rg.DELETE("/users/:id", p.Wrap.JSON(p.destroyUser))

	rg.GET("/domains", p.Wrap.JSON(p.indexDomains))
	rg.POST("/domains", p.Wrap.FORM(&fmDomain{}, p.createDomain))
	rg.POST("/domains/:id", p.Wrap.FORM(&fmDomain{}, p.updateDomain))
	rg.DELETE("/domains/:id", p.Wrap.JSON(p.destroyDomain))

	rg.GET("/aliases", p.Wrap.JSON(p.indexAliases))
	rg.POST("/aliases", p.Wrap.FORM(&fmAlias{}, p.createAlias))
	rg.POST("/aliases/:id", p.Wrap.FORM(&fmAlias{}, p.updateAlias))
	rg.DELETE("/aliases/:id", p.Wrap.JSON(p.destroyAlias))
}
