package site

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

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
