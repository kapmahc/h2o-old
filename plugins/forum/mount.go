package forum

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	hg := rt.Group("/htdocs/:lang/forum")
	hg.GET("/articles", p.Wrap.HTML("forum/articles/index", p.indexArticlesHTML))
	hg.GET("/articles/:id", p.Wrap.HTML("forum/articles/show", p.showArticleHTML))
	hg.GET("/tags", p.Wrap.HTML("forum/tags/index", p.indexTagsHTML))
	hg.GET("/tags/:id", p.Wrap.HTML("forum/tags/show", p.showTagHTML))
	hg.GET("/comments", p.Wrap.HTML("forum/comments/index", p.indexCommentsHTML))

	rg := rt.Group("/forum")

	rg.GET("/articles", p.Jwt.MustSignInMiddleware, p.Wrap.JSON(p.indexArticles))
	rg.POST("/articles", p.Jwt.MustSignInMiddleware, p.Wrap.FORM(&fmArticle{}, p.createArticle))
	rg.POST("/articles/:id", p.Jwt.MustSignInMiddleware, p.canEditArticle, p.Wrap.FORM(&fmArticle{}, p.updateArticle))
	rg.DELETE("/articles/:id", p.Jwt.MustSignInMiddleware, p.canEditArticle, p.Wrap.JSON(p.destroyArticle))

	rg.GET("/tags", p.Wrap.JSON(p.indexTags))
	rg.POST("/tags", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmTag{}, p.createTag))
	rg.POST("/tags/:id", p.Jwt.MustAdminMiddleware, p.Wrap.FORM(&fmTag{}, p.updateTag))
	rg.DELETE("/tags/:id", p.Jwt.MustAdminMiddleware, p.Wrap.JSON(p.destroyTag))

	rg.GET("/comments", p.Jwt.MustSignInMiddleware, p.Wrap.JSON(p.indexComments))
	rg.POST("/comments", p.Jwt.MustSignInMiddleware, p.Wrap.FORM(&fmCommentAdd{}, p.createComment))
	rg.POST("/comments/:id", p.Jwt.MustSignInMiddleware, p.canEditComment, p.Wrap.FORM(&fmCommentEdit{}, p.updateComment))
	rg.DELETE("/comments/:id", p.Jwt.MustSignInMiddleware, p.canEditComment, p.Wrap.JSON(p.destroyComment))

}
