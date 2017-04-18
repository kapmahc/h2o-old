package site

import "github.com/gin-gonic/gin"

func (p *Plugin) indexPages(c *gin.Context, l string) (interface{}, error) {
	var items []Page
	err := p.Db.Where("lang = ?", l).Order("updated_at DESC").Find(&items).Error
	return items, err
}

type fmPage struct {
	Loc     string `form:"loc" binding:"required,max=16"`
	Href    string `form:"href" binding:"required,max=255"`
	Logo    string `form:"logo" binding:"required,max=255"`
	Title   string `form:"title" binding:"required,max=255"`
	Summary string `form:"summary" binding:"required,max=800"`
	Sort    int    `form:"sort"`
}

func (p *Plugin) createPage(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmPage)
	n := Page{
		Lang:    l,
		Loc:     fm.Loc,
		Href:    fm.Href,
		Logo:    fm.Logo,
		Summary: fm.Summary,
		Title:   fm.Title,
		Sort:    fm.Sort,
	}
	err := p.Db.Create(&n).Error
	return n, err
}

func (p *Plugin) updatePage(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmPage)
	var n Page
	if err := p.Db.Where("id = ?", c.Param("id")).First(&n).Error; err != nil {
		return nil, err
	}

	err := p.Db.Model(&n).Updates(map[string]interface{}{
		"loc":     fm.Loc,
		"sort":    fm.Sort,
		"logo":    fm.Logo,
		"summary": fm.Summary,
		"title":   fm.Title,
		"href":    fm.Href,
	}).Error

	return n, err
}

func (p *Plugin) destroyPage(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Page{}).Error
	return gin.H{}, err
}
