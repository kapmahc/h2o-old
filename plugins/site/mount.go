package site

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	rt.GET("/notices.html", p.Wrap.HTML("site/notices/index", p.indexNoticesHTML))
	rt.GET("/locales/:lang", p.Wrap.JSON(p.getLocales))
	rt.GET("/site/info", p.Wrap.JSON(p.getSiteInfo))

	rt.GET("/notices", p.Wrap.JSON(p.indexNotices))
	rt.POST("/notices", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmNotice{}, p.createNotice))
	rt.POST("/notices/:id", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmNotice{}, p.updateNotice))
	rt.DELETE("/notices/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyNotice))

	rt.GET("/leave-words", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.indexLeaveWords))
	rt.POST("/leave-words", p.Wrap.FORM(&fmLeaveWord{}, p.createLeaveWord))
	rt.DELETE("/leave-words/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyLeaveWord))

	ag := rt.Group("/admin", p.Jwt.MustAdminMiddleware)
	ag.GET("/site/status", p.Wrap.JSON(p.getAdminSiteStatus))
	ag.POST("/site/info", p.Wrap.FORM(&fmSiteInfo{}, p.postAdminSiteInfo))
	ag.POST("/site/author", p.Wrap.FORM(&fmSiteAuthor{}, p.postAdminSiteAuthor))
	ag.GET("/site/seo", p.Wrap.JSON(p.getAdminSiteSeo))
	ag.POST("/site/seo", p.Wrap.FORM(&fmSiteSeo{}, p.postAdminSiteSeo))
	ag.GET("/site/smtp", p.Wrap.JSON(p.getAdminSiteSMTP))
	ag.POST("/site/smtp", p.Wrap.FORM(&fmSiteSMTP{}, p.postAdminSiteSMTP))

	ag.GET("/users", p.Wrap.JSON(p.getAdminUsers))

	ag.GET("/locales", p.Wrap.JSON(p.getAdminLocales))
	ag.POST("/locales", p.Wrap.FORM(&fmLocale{}, p.postAdminLocales))
	ag.DELETE("/locales/:code", p.Wrap.JSON(p.deleteAdminLocale))

	ag.GET("/links", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.indexLinks))
	ag.POST("/links", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmLink{}, p.createLink))
	ag.POST("/links/:id", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmLink{}, p.updateLink))
	ag.DELETE("/links/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyLink))

	ag.GET("/pages", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.indexPages))
	ag.POST("/pages", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmPage{}, p.createPage))
	ag.POST("/pages/:id", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmPage{}, p.updatePage))
	ag.DELETE("/pages/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyPage))

}
