package forum

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/plugins/auth"
)

func (p *Plugin) indexComments(c *gin.Context, _ string) (interface{}, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	isa := c.MustGet(auth.IsAdmin).(bool)
	var comments []Comment
	qry := p.Db.Select([]string{"body", "article_id", "updated_at", "id"})
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&comments).Error; err != nil {
		return nil, err
	}

	return comments, nil
}

type fmCommentAdd struct {
	Body      string `form:"body" binding:"required,max=800"`
	Type      string `form:"type" binding:"required,max=8"`
	ArticleID uint   `form:"articleId" binding:"required"`
}

func (p *Plugin) createComment(c *gin.Context, _ string, o interface{}) (interface{}, error) {

	user := c.MustGet(auth.CurrentUser).(*auth.User)
	fm := o.(*fmCommentAdd)
	cm := Comment{
		Body:      fm.Body,
		Type:      fm.Type,
		ArticleID: fm.ArticleID,
		UserID:    user.ID,
	}

	if err := p.Db.Create(&cm).Error; err != nil {
		return nil, err
	}
	return cm, nil
}

type fmCommentEdit struct {
	Body string `form:"body" binding:"required,max=800"`
	Type string `form:"type" binding:"required,max=8"`
}

func (p *Plugin) updateComment(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	cm := c.MustGet("comment").(*Comment)
	fm := o.(*fmCommentEdit)
	if err := p.Db.Model(cm).Updates(map[string]interface{}{
		"body": fm.Body,
		"type": fm.Type,
	}).Error; err != nil {
		return nil, err
	}

	return gin.H{}, nil
}

func (p *Plugin) destroyComment(c *gin.Context, _ string) (interface{}, error) {
	comment := c.MustGet("comment").(*Comment)
	err := p.Db.Delete(comment).Error
	return gin.H{}, err
}

func (p *Plugin) canEditComment(c *gin.Context) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var o Comment
	err := p.Db.Where("id = ?", c.Param("id")).First(&o).Error
	if err == nil {
		if user.ID == o.UserID || c.MustGet(auth.IsAdmin).(bool) {
			c.Set("comment", &o)
			c.Next()
			return
		}
		c.AbortWithStatus(http.StatusForbidden)
	} else {
		c.String(http.StatusInternalServerError, err.Error())
	}
}
