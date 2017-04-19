package mail

import (
	"github.com/facebookgo/inject"
	"github.com/ikeikeikeike/go-sitemap-generator/stm"
	"github.com/jinzhu/gorm"
	"github.com/kapmahc/h2o/plugins/auth"
	"github.com/kapmahc/h2o/web"
	"github.com/kapmahc/h2o/web/i18n"
	"github.com/kapmahc/h2o/web/job"
	"github.com/urfave/cli"
	"golang.org/x/tools/blog/atom"
)

// Plugin plugin
type Plugin struct {
	Db   *gorm.DB   `inject:""`
	Wrap *web.Wrap  `inject:""`
	Jwt  *auth.Jwt  `inject:""`
	I18n *i18n.I18n `inject:""`
}

// Init init config
func (p *Plugin) Init() {}

// Open inject beans
func (p *Plugin) Open(*inject.Graph) error {
	return nil
}

// Console console commands
func (p *Plugin) Console() []cli.Command {
	return nil
}

// Atom rss.atom
func (p *Plugin) Atom(lang string) ([]*atom.Entry, error) {
	return []*atom.Entry{}, nil
}

// Sitemap sitemap.xml.gz
func (p *Plugin) Sitemap(languages ...string) ([]stm.URL, error) {
	return []stm.URL{}, nil
}

// Workers job handler
func (p *Plugin) Workers() map[string]job.Handler {
	return map[string]job.Handler{}
}

func init() {
	web.Register(&Plugin{})
}
