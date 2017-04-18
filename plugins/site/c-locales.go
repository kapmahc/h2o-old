package site

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/text/language"
)

func (p *Plugin) getLocales(c *gin.Context, _ string) (interface{}, error) {
	tag, err := language.Parse(c.Param("lang"))
	if err != nil {
		return nil, err
	}

	tag, _, _ = p.Matcher.Match(tag)
	return p.I18n.All(tag.String())
}

func (p *Plugin) getAdminLocales(c *gin.Context, l string) (interface{}, error) {
	return p.I18n.Store.All(l)
}

func (p *Plugin) deleteAdminLocale(c *gin.Context, l string) (interface{}, error) {
	return gin.H{}, p.I18n.Store.Del(l, c.Param("code"))
}

type fmLocale struct {
	Code    string `form:"code" binding:"required,max=255"`
	Message string `form:"message" binding:"required"`
}

func (p *Plugin) postAdminLocales(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmLocale)
	return gin.H{}, p.I18n.Store.Set(l, fm.Code, fm.Message, true)
}
