package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/web/i18n"
	"github.com/spf13/viper"
)

func (p *Plugin) getHome(c *gin.Context) {
	lang := c.MustGet(i18n.LOCALE).(string)
	data, err := p.getHomeHTML(c, lang)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	data["lang"] = lang
	p.Render.HTML(c.Writer, http.StatusOK, "site/home", data)
}

func (p *Plugin) getSiteInfo(c *gin.Context, l string) (interface{}, error) {

	data := gin.H{"locale": l}
	for _, k := range []string{"title", "subTitle", "keywords", "description", "copyright"} {
		data[k] = p.I18n.T(l, "site."+k)
	}
	author := gin.H{}
	for _, k := range []string{"name", "email"} {
		author[k] = p.I18n.T(l, "site.author."+k)
	}
	data["author"] = author
	data["languages"] = viper.GetStringSlice("languages")
	return data, nil
}
