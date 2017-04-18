package reading

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	hg := rt.Group("/htdocs/:lang/reading")
	hg.GET("/books", p.Wrap.HTML("reading/books/index", p.indexBooksHTML))
	hg.GET("/books/:id", p.Wrap.HTML("reading/books/show", p.showBookHTML))
	hg.GET("/pages/:id/*href", p.showPageHTML)
	hg.GET("/notes", p.Wrap.HTML("reading/notes/index", p.indexNotesHTML))

	rg := rt.Group("/reading")
	rg.POST("/dict/query", p.Wrap.FORM(&fmDict{}, p.postDictQuery))
	rg.GET("/books", p.Wrap.JSON(p.indexBooks))

	rg.GET("/notes", p.Jwt.MustSignInMiddleware, p.Wrap.JSON(p.indexNotes))
	rg.POST("/notes", p.Jwt.MustSignInMiddleware, p.Wrap.FORM(&fmNoteNew{}, p.createNote))
	rg.POST("/notes/:id", p.Jwt.MustSignInMiddleware, p.canEditNote, p.Wrap.FORM(&fmNoteEdit{}, p.updateNote))
	rg.DELETE("/notes/:id", p.Jwt.MustSignInMiddleware, p.canEditNote, p.Wrap.JSON(p.destroyNote))

	ag := rt.Group("/reading", p.Jwt.MustAdminMiddleware)
	ag.GET("/status", p.Wrap.JSON(p.getStatus))
	ag.DELETE("/books/:id", p.Wrap.JSON(p.destroyBook))

}
