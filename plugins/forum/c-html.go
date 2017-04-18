package forum

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/web"
)

func (p *Plugin) indexCommentsHTML(c *gin.Context, _ string) (gin.H, error) {
	var total int64
	if err := p.Db.Model(&Comment{}).Count(&total).Error; err != nil {
		return nil, err
	}
	var pag *web.Pagination

	pag = web.NewPagination(c.Request, total)

	var comments []Comment
	if err := p.Db.Select([]string{"id", "type", "body", "article_id", "updated_at"}).
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&comments).Error; err != nil {
		return nil, err
	}
	for _, it := range comments {
		pag.Items = append(pag.Items, it)
	}

	return gin.H{"pager": pag}, nil
}

// ---------------------

func (p *Plugin) showTagHTML(c *gin.Context, _ string) (gin.H, error) {

	var tag Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&tag).Error; err != nil {
		return nil, err
	}

	if err := p.Db.Model(&tag).Association("Articles").Find(&tag.Articles).Error; err != nil {
		return nil, err
	}

	return gin.H{"tag": tag}, nil
}

func (p *Plugin) indexTagsHTML(c *gin.Context, _ string) (gin.H, error) {
	var tags []Tag
	if err := p.Db.Find(&tags).Error; err != nil {
		return nil, err
	}
	return gin.H{"tags": tags}, nil
}

// -----------------

func (p *Plugin) showArticleHTML(c *gin.Context, _ string) (gin.H, error) {
	var a Article
	if err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error; err != nil {
		return nil, err
	}
	if err := p.Db.Model(&a).Related(&a.Comments).Error; err != nil {
		return nil, err
	}
	if err := p.Db.Model(&a).Association("Tags").Find(&a.Tags).Error; err != nil {
		return nil, err
	}
	return gin.H{"article": a}, nil
}

func (p *Plugin) indexArticlesHTML(c *gin.Context, _ string) (gin.H, error) {

	var total int64
	var pag *web.Pagination
	if err := p.Db.Model(&Article{}).Count(&total).Error; err != nil {
		return nil, err
	}

	pag = web.NewPagination(c.Request, total)
	var articles []Article
	if err := p.Db.Select([]string{"id", "title", "summary", "user_id", "updated_at"}).
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&articles).Error; err != nil {
		return nil, err
	}

	for _, it := range articles {
		pag.Items = append(pag.Items, it)
	}

	return gin.H{"pager": pag}, nil
}
