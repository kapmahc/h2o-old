package site

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(ht *gin.RouterGroup, api *gin.RouterGroup) {

	ht.GET("/", p.Wrap.HTML("site/home", p.getHomeHTML))
	ht.GET("/posts/:name", p.Wrap.HTML("site/posts/show", p.showPostHTML))
	ht.GET("/posts", p.Wrap.HTML("site/posts/index", p.indexPostsHTML))
	ht.GET("/notices", p.Wrap.HTML("site/notices/index", p.indexNoticesHTML))

	api.GET("/locales/:lang", p.Wrap.JSON(p.getLocales))
	api.GET("/site/info", p.Wrap.JSON(p.getSiteInfo))

	api.GET("/notices", p.Wrap.JSON(p.indexNotices))
	api.POST("/notices", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmNotice{}, p.createNotice))
	api.POST("/notices/:id", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmNotice{}, p.updateNotice))
	api.DELETE("/notices/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyNotice))

	api.GET("/leave-words", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.indexLeaveWords))
	api.POST("/leave-words", p.Wrap.FORM(&fmLeaveWord{}, p.createLeaveWord))
	api.DELETE("/leave-words/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyLeaveWord))

	ag := api.Group("/admin", p.Jwt.MustAdminMiddleware)
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

	ag.GET("/posts", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.indexPosts))
	ag.POST("/posts", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmPost{}, p.createPost))
	ag.POST("/posts/:id", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmPost{}, p.updatePost))
	ag.DELETE("/posts/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyPost))

}
