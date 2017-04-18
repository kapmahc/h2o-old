package reading

import "github.com/gin-gonic/gin"

func (p *Plugin) getStatus(c *gin.Context, l string) (interface{}, error) {
	data := gin.H{}
	var bc int
	if err := p.Db.Model(&Book{}).Count(&bc).Error; err != nil {
		return nil, err
	}
	data["book"] = gin.H{
		p.I18n.T(l, "reading.admin.status.book-count"): bc,
	}

	dict := gin.H{}
	for _, dic := range dictionaries {
		dict[dic.GetBookName()] = dic.GetWordCount()
	}
	data["dict"] = dict
	return data, nil
}
