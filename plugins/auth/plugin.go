package auth

import (
	"github.com/facebookgo/inject"
	"github.com/ikeikeikeike/go-sitemap-generator/stm"
	"github.com/jinzhu/gorm"
	"github.com/kapmahc/h2o/web"
	"github.com/kapmahc/h2o/web/i18n"
	"github.com/kapmahc/h2o/web/job"
	"github.com/kapmahc/h2o/web/security"
	"github.com/kapmahc/h2o/web/settings"
	"github.com/kapmahc/h2o/web/uploader"
	"golang.org/x/tools/blog/atom"
)

// Plugin plugin
type Plugin struct {
	Db       *gorm.DB           `inject:""`
	Jwt      *Jwt               `inject:""`
	Dao      *Dao               `inject:""`
	I18n     *i18n.I18n         `inject:""`
	Settings *settings.Settings `inject:""`
	Server   *job.Server        `inject:""`
	Wrap     *web.Wrap          `inject:""`
	Hmac     *security.Hmac     `inject:""`
	Uploader uploader.Store     `inject:""`
}

// Init init config
func (p *Plugin) Init() {}

// Open inject beans
func (p *Plugin) Open(*inject.Graph) error {
	return nil
}

// Atom rss.atom
func (p *Plugin) Atom(lang string) ([]*atom.Entry, error) {
	return []*atom.Entry{}, nil
}

// Sitemap sitemap.xml.gz
func (p *Plugin) Sitemap(languages ...string) ([]stm.URL, error) {
	var items []stm.URL
	for _, l := range languages {
		items = append(items, stm.URL{"loc": p.Wrap.URLFor(l, "/users")})
	}
	return items, nil
}

func init() {
	web.Register(&Plugin{})
}
