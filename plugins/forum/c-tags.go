package forum

import "github.com/gin-gonic/gin"

func (p *Plugin) indexTags(c *gin.Context, _ string) (interface{}, error) {
	var tags []Tag
	if err := p.Db.Order("updated_at DESC").Find(&tags).Error; err != nil {
		return nil, err
	}
	return tags, nil
}

type fmTag struct {
	Name string `form:"name" binding:"required,max=255"`
}

func (p *Plugin) createTag(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmTag)
	t := Tag{Name: fm.Name}
	if err := p.Db.Create(&t).Error; err != nil {
		return nil, err
	}
	return t, nil
}

func (p *Plugin) updateTag(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmTag)
	if err := p.Db.Model(&Tag{}).Where("id = ?", c.Param("id")).Update("name", fm.Name).Error; err != nil {
		return nil, err
	}
	return gin.H{}, nil
}

func (p *Plugin) destroyTag(c *gin.Context, _ string) (interface{}, error) {
	var tag Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&tag).Error; err != nil {
		return nil, err
	}

	if err := p.Db.Model(&tag).Association("Articles").Clear().Error; err != nil {
		return nil, err
	}

	err := p.Db.Delete(&tag).Error
	return gin.H{}, err
}
