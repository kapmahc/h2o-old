package reading

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/plugins/auth"
)

func (p *Plugin) indexNotes(c *gin.Context, _ string) (interface{}, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	isa := c.MustGet(auth.IsAdmin).(bool)
	var notes []Note
	qry := p.Db
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&notes).Error; err != nil {
		return nil, err
	}
	return notes, nil
}

type fmNoteNew struct {
	Type   string `form:"type" binding:"required,max=8"`
	Body   string `form:"body" binding:"required,max=2000"`
	BookID uint   `form:"bookId"`
}

func (p *Plugin) createNote(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	fm := o.(*fmNoteNew)
	n := Note{
		Type:   fm.Type,
		Body:   fm.Body,
		BookID: fm.BookID,
		UserID: user.ID,
	}
	if err := p.Db.Create(&n).Error; err != nil {
		return nil, err
	}

	return n, nil
}

type fmNoteEdit struct {
	Type string `form:"type" binding:"required,max=8"`
	Body string `form:"body" binding:"required,max=2000"`
}

func (p *Plugin) updateNote(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	note := c.MustGet("note").(*Note)
	fm := o.(*fmNoteEdit)

	if err := p.Db.Model(note).
		Updates(map[string]interface{}{
			"body": fm.Body,
			"type": fm.Type,
		}).Error; err != nil {
		return nil, err
	}
	return gin.H{}, nil
}

func (p *Plugin) destroyNote(c *gin.Context, _ string) (interface{}, error) {
	n := c.MustGet("note").(*Note)
	err := p.Db.Delete(n).Error
	return gin.H{}, err
}

func (p *Plugin) canEditNote(c *gin.Context) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var n Note
	err := p.Db.Where("id = ?", c.Param("id")).First(&n).Error
	if err == nil {
		if user.ID == n.UserID || c.MustGet(auth.IsAdmin).(bool) {
			c.Set("note", &n)
			c.Next()
			return
		}
		c.AbortWithStatus(http.StatusForbidden)
	} else {
		c.String(http.StatusInternalServerError, err.Error())
	}
}
