package forum

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/plugins/auth"
)

func (p *Plugin) indexArticles(c *gin.Context, _ string) (interface{}, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	isa := c.MustGet(auth.IsAdmin).(bool)
	var articles []Article
	qry := p.Db.Select([]string{"title", "updated_at", "id"})
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&articles).Error; err != nil {
		return nil, err
	}
	return articles, nil
}

type fmArticle struct {
	Title   string   `form:"title" binding:"required,max=255"`
	Summary string   `form:"summary" binding:"required,max=500"`
	Type    string   `form:"type" binding:"required,max=8"`
	Body    string   `form:"body" binding:"required,max=2000"`
	Tags    []string `form:"tags"`
}

func (p *Plugin) createArticle(c *gin.Context, _ string, o interface{}) (interface{}, error) {

	user := c.MustGet(auth.CurrentUser).(*auth.User)
	fm := o.(*fmArticle)
	var tags []Tag
	for _, it := range fm.Tags {
		var t Tag
		if err := p.Db.Select([]string{"id"}).Where("id = ?", it).First(&t).Error; err == nil {
			tags = append(tags, t)
		} else {
			return nil, err
		}
	}
	a := Article{
		Title:   fm.Title,
		Summary: fm.Summary,
		Body:    fm.Body,
		Type:    fm.Type,
		UserID:  user.ID,
	}

	if err := p.Db.Create(&a).Error; err != nil {
		return nil, err
	}
	if err := p.Db.Model(&a).Association("Tags").Append(tags).Error; err != nil {
		return nil, err
	}
	return a, nil
}

func (p *Plugin) updateArticle(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	a := c.MustGet("article").(*Article)
	if err := p.Db.Model(a).Association("Tags").Find(&a.Tags).Error; err != nil {
		return nil, err
	}
	fm := o.(*fmArticle)

	var tags []Tag
	for _, it := range fm.Tags {
		var t Tag
		if err := p.Db.Select([]string{"id"}).Where("id = ?", it).First(&t).Error; err == nil {
			tags = append(tags, t)
		} else {
			return nil, err
		}
	}

	if err := p.Db.Model(a).Updates(map[string]interface{}{
		"title":   fm.Title,
		"summary": fm.Summary,
		"body":    fm.Body,
		"type":    fm.Type,
	}).Error; err != nil {
		return nil, err
	}

	if err := p.Db.Model(a).Association("Tags").Replace(tags).Error; err != nil {
		return nil, err
	}
	return gin.H{}, nil
}

func (p *Plugin) destroyArticle(c *gin.Context, _ string) (interface{}, error) {
	a := c.MustGet("article").(*Article)
	if err := p.Db.Model(a).Association("Tags").Clear().Error; err != nil {
		return nil, err
	}
	err := p.Db.Delete(a).Error
	return gin.H{}, err
}

func (p *Plugin) canEditArticle(c *gin.Context) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var a Article
	err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error
	if err == nil {
		if user.ID == a.UserID || c.MustGet(auth.IsAdmin).(bool) {
			c.Set("article", &a)
			c.Next()
			return
		}
		c.AbortWithStatus(http.StatusForbidden)
	} else {
		c.String(http.StatusInternalServerError, err.Error())
	}

}
