package site

import "github.com/gin-gonic/gin"

func (p *Plugin) indexLeaveWords(c *gin.Context, _ string) (interface{}, error) {
	var items []LeaveWord
	err := p.Db.Order("created_at DESC").Find(&items).Error
	return items, err
}

type fmLeaveWord struct {
	Body string `form:"body" binding:"required,max=800"`
	Type string `form:"type" binding:"required,max=8"`
}

func (p *Plugin) createLeaveWord(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmLeaveWord)
	err := p.Db.Create(&LeaveWord{Type: fm.Type, Body: fm.Body}).Error
	return gin.H{}, err
}

func (p *Plugin) destroyLeaveWord(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(LeaveWord{}).Error
	return gin.H{}, err
}
