package site

import "github.com/gin-gonic/gin"

func (p *Plugin) indexPosts(c *gin.Context, l string) (interface{}, error) {
	var items []Post
	err := p.Db.Where("lang = ?", l).Order("updated_at DESC").Find(&items).Error
	return items, err
}

type fmPost struct {
	Name  string `form:"name" binding:"required,max=255"`
	Title string `form:"title" binding:"required,max=255"`
	Body  string `form:"body" binding:"required"`
	Type  string `form:"type" binding:"required,max=16"`
}

func (p *Plugin) createPost(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmPost)
	n := Post{
		Lang:  l,
		Name:  fm.Name,
		Title: fm.Title,
		Body:  fm.Body,
		Type:  fm.Type,
	}
	err := p.Db.Create(&n).Error
	return n, err
}

func (p *Plugin) updatePost(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmPost)
	var n Post
	if err := p.Db.Where("id = ?", c.Param("id")).First(&n).Error; err != nil {
		return nil, err
	}

	err := p.Db.Model(&n).Updates(map[string]interface{}{
		"name":  fm.Name,
		"title": fm.Title,
		"body":  fm.Body,
		"type":  fm.Type,
	}).Error

	return n, err
}

func (p *Plugin) destroyPost(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Post{}).Error
	return gin.H{}, err
}
