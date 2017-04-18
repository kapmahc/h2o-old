package site

import "github.com/gin-gonic/gin"

func (p *Plugin) getHomeHTML(c *gin.Context, l string) (gin.H, error) {
	return gin.H{}, nil
}

func (p *Plugin) showPostHTML(c *gin.Context, l string) (gin.H, error) {
	var item []Post
	err := p.Db.
		Where("lang = ? AND name = ?", l, c.Param("name")).
		First(&item).Error
	return gin.H{"post": item}, err
}

func (p *Plugin) indexPostsHTML(c *gin.Context, l string) (gin.H, error) {
	var items []Post
	err := p.Db.
		Where("lang = ?", l).
		Order("updated_at DESC").
		Find(&items).Error
	return gin.H{"posts": items}, err
}

// -----------------------

func (p *Plugin) indexNoticesHTML(c *gin.Context, l string) (gin.H, error) {
	var items []Notice
	err := p.Db.
		Where("lang = ?", l).
		Select([]string{"type", "body", "updated_at"}).
		Order("updated_at DESC").
		Find(&items).Error
	return gin.H{"notices": items}, err
}
