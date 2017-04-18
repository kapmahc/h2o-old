package site

import "github.com/gin-gonic/gin"

func (p *Plugin) indexNoticesHTML(c *gin.Context, l string) (gin.H, error) {
	var items []Notice
	err := p.Db.
		Where("lang = ?", l).
		Select([]string{"type", "body", "updated_at"}).
		Order("updated_at DESC").
		Find(&items).Error
	return gin.H{"notices": items}, err
}
