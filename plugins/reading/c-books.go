package reading

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/web"
)

func (p *Plugin) indexBooks(c *gin.Context, l string) (interface{}, error) {

	var total int64
	if err := p.Db.Model(&Book{}).Count(&total).Error; err != nil {
		return nil, err
	}
	pag := web.NewPagination(c.Request, total)

	var books []Book
	if err := p.Db.
		Select([]string{"id", "title", "author"}).
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&books).Error; err != nil {
		return nil, err
	}

	for _, b := range books {
		pag.Items = append(pag.Items, b)
	}
	return pag, nil
}

func (p *Plugin) destroyBook(c *gin.Context, _ string) (interface{}, error) {
	err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Book{}).Error
	return gin.H{}, err
}
