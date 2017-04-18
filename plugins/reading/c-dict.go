package reading

import (
	"path"

	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/stardict"
)

type fmDict struct {
	Keywords string `form:"keywords" binding:"required,max=255"`
}

func (p *Plugin) postDictQuery(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmDict)
	rst := gin.H{}
	for _, dic := range dictionaries {
		for _, sen := range dic.Translate(fm.Keywords) {
			var items []gin.H
			for _, pat := range sen.Parts {
				items = append(items, gin.H{"type": pat.Type, "data": string(pat.Data)})
				// switch pat.Type {
				// case 'g', 'h':
				// 	items = append(items, template.HTML(pat.Data))
				// default:
				// 	items = append(items, string(pat.Data))
				// }
			}
			rst[dic.GetBookName()] = items
		}
	}
	return rst, nil
}

var dictionaries []*stardict.Dictionary

func init() {
	var err error
	dictionaries, err = stardict.Open(path.Join("tmp", "dic"))
	if err != nil {
		log.Error("bad in open stardict")
	}
}
