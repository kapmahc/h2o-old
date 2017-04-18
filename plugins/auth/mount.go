package auth

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	hg := rt.Group("/htdocs")
	hg.GET("/users", p.Wrap.HTML("auth/users/index", p.indexUsersHTML))

	nug := rt.Group("/users")
	nug.POST("/sign-up", p.Wrap.FORM(&fmSignUp{}, p.postUsersSignUp))
	nug.POST("/sign-in", p.Wrap.FORM(&fmSignIn{}, p.postUsersSignIn))
	nug.GET("/confirm/:token", p.Wrap.Redirect(p.getUsersConfirmToken))
	nug.POST("/confirm", p.Wrap.FORM(&fmEmail{}, p.postUsersConfirm))
	nug.GET("/unlock/:token", p.Wrap.Redirect(p.getUsersUnlockToken))
	nug.POST("/unlock", p.Wrap.FORM(&fmEmail{}, p.postUsersUnlock))
	nug.POST("/forgot-password", p.Wrap.FORM(&fmEmail{}, p.postUsersForgotPassword))

	mug := rt.Group("/users", p.Jwt.MustSignInMiddleware)
	mug.GET("/logs", p.Wrap.JSON(p.getUsersLogs))
	mug.GET("/info", p.Wrap.JSON(p.getUsersInfo))
	mug.POST("/info", p.Wrap.FORM(&fmInfo{}, p.postUsersInfo))
	mug.POST("/change-password", p.Wrap.FORM(&fmChangePassword{}, p.postUsersChangePassword))
	mug.DELETE("/sign-out", p.Wrap.JSON(p.deleteUsersSignOut))

	ag := rt.Group("/attachments")
	ag.GET("/", p.Jwt.MustSignInMiddleware, p.Wrap.JSON(p.indexAttachments))
	ag.POST("/", p.Jwt.MustSignInMiddleware, p.Wrap.FORM(&fmAttachmentNew{}, p.createAttachment))
	ag.GET("/:id", p.Wrap.JSON(p.showAttachment))
	ag.POST("/:id", p.Jwt.MustSignInMiddleware, p.canEditAttachment, p.Wrap.FORM(&fmAttachmentEdit{}, p.updateAttachment))
	ag.DELETE("/:id", p.Jwt.MustSignInMiddleware, p.canEditAttachment, p.Wrap.JSON(p.destroyAttachment))
}
