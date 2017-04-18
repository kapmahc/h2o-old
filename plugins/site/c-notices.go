package site

import "github.com/gin-gonic/gin"

func (p *Plugin) indexNotices(c *gin.Context, l string) (interface{}, error) {
	var items []Notice
	err := p.Db.Where("lang = ?", l).Order("updated_at DESC").Find(&items).Error
	return items, err
}

type fmNotice struct {
	Body string `form:"body" binding:"required,max=800"`
	Type string `form:"type" binding:"required,max=8"`
}

func (p *Plugin) createNotice(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmNotice)
	n := Notice{Type: fm.Type, Body: fm.Body, Lang: l}
	err := p.Db.Create(&n).Error
	return n, err
}

func (p *Plugin) updateNotice(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmNotice)
	var n Notice
	if err := p.Db.Where("id = ?", c.Param("id")).First(&n).Error; err != nil {
		return nil, err
	}

	err := p.Db.Model(&n).Updates(map[string]interface{}{
		"body": fm.Body,
		"type": fm.Type,
	}).Error

	return n, err
}

func (p *Plugin) destroyNotice(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Notice{}).Error
	return gin.H{}, err
}
