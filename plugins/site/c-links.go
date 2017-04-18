package site

import "github.com/gin-gonic/gin"

func (p *Plugin) indexLinks(c *gin.Context, l string) (interface{}, error) {
	var items []Link
	err := p.Db.Where("lang = ?", l).Order("updated_at DESC").Find(&items).Error
	return items, err
}

type fmLink struct {
	Loc   string `form:"loc" binding:"required,max=16"`
	Href  string `form:"href" binding:"required,max=255"`
	Label string `form:"label" binding:"required,max=255"`
	Sort  int    `form:"sort"`
}

func (p *Plugin) createLink(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmLink)
	n := Link{
		Lang:  l,
		Loc:   fm.Loc,
		Href:  fm.Href,
		Label: fm.Label,
		Sort:  fm.Sort,
	}
	err := p.Db.Create(&n).Error
	return n, err
}

func (p *Plugin) updateLink(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmLink)
	var n Link
	if err := p.Db.Where("id = ?", c.Param("id")).First(&n).Error; err != nil {
		return nil, err
	}

	err := p.Db.Model(&n).Updates(map[string]interface{}{
		"loc":   fm.Loc,
		"sort":  fm.Sort,
		"label": fm.Label,
		"href":  fm.Href,
	}).Error

	return n, err
}

func (p *Plugin) destroyLink(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Link{}).Error
	return gin.H{}, err
}
