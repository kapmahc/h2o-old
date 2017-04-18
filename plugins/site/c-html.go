package site

import "github.com/gin-gonic/gin"

func (p *Plugin) showPostHTML(c *gin.Context, l string) (gin.H, error) {
	var item []Post
	err := p.Db.
		Where("lang = ? AND name = ?", l, c.Param("name")).
		First(&item).Error
	return gin.H{"post": item}, err
}

func (p *Plugin) indexNoticesHTML(c *gin.Context, l string) (gin.H, error) {
	var items []Notice
	err := p.Db.
		Where("lang = ?", l).
		Select([]string{"type", "body", "updated_at"}).
		Order("updated_at DESC").
		Find(&items).Error
	return gin.H{"notices": items}, err
}
