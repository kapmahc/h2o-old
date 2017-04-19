package mail

import "github.com/gin-gonic/gin"

func (p *Plugin) indexDomains(c *gin.Context, _ string) (interface{}, error) {
	var items []Domain
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}

type fmDomain struct {
	Name string `form:"name" binding:"required,max=255"`
}

func (p *Plugin) createDomain(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmDomain)
	item := Domain{
		Name: fm.Name,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return nil, err
	}
	return item, nil
}

func (p *Plugin) updateDomain(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmDomain)
	if err := p.Db.Model(&Domain{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"name": fm.Name,
		}).Error; err != nil {
		return nil, err
	}

	return gin.H{}, nil
}

func (p *Plugin) destroyDomain(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Domain{}).Error
	return gin.H{}, err
}
