package site

import (
	"fmt"

	"github.com/ikeikeikeike/go-sitemap-generator/stm"
	"github.com/jinzhu/gorm"
	"github.com/kapmahc/h2o/plugins/auth"
	"github.com/kapmahc/h2o/web"
	"github.com/kapmahc/h2o/web/cache"
	"github.com/kapmahc/h2o/web/i18n"
	"github.com/kapmahc/h2o/web/job"
	"github.com/kapmahc/h2o/web/settings"
	"github.com/spf13/viper"
	"github.com/unrolled/render"
	"golang.org/x/text/language"
	"golang.org/x/tools/blog/atom"
)

// Plugin plugin
type Plugin struct {
	Db       *gorm.DB           `inject:""`
	Jwt      *auth.Jwt          `inject:""`
	Dao      *auth.Dao          `inject:""`
	I18n     *i18n.I18n         `inject:""`
	Settings *settings.Settings `inject:""`
	Server   *job.Server        `inject:""`
	Cache    *cache.Cache       `inject:""`
	Wrap     *web.Wrap          `inject:""`
	Matcher  language.Matcher   `inject:""`
	Render   *render.Render     `inject:""`
}

// Init init config
func (p *Plugin) Init() {}

// Atom rss.atom
func (p *Plugin) Atom(lang string) ([]*atom.Entry, error) {
	return []*atom.Entry{}, nil
}

// Sitemap sitemap.xml.gz
func (p *Plugin) Sitemap(languages ...string) ([]stm.URL, error) {
	var items []stm.URL
	for _, l := range languages {
		items = append(
			items,
			stm.URL{"loc": fmt.Sprintf("htdocs/%s/", l)},
			stm.URL{"loc": fmt.Sprintf("htdocs/%s/notices", l)},
			stm.URL{"loc": fmt.Sprintf("htdocs/%s/posts", l)},
		)
	}

	var posts []Post
	if err := p.Db.
		Select([]string{"name", "lang", "updated_at"}).
		Order("updated DESC").
		Find(&posts).Error; err != nil {
		return nil, err
	}
	for _, it := range posts {
		items = append(
			items,
			stm.URL{
				"loc":     fmt.Sprintf("htdocs/%s/posts/%s", it.Lang, it.Name),
				"lastmod": it.UpdatedAt,
			},
		)
	}

	return items, nil
}

// Workers job handler
func (p *Plugin) Workers() map[string]job.Handler {
	return map[string]job.Handler{}
}

func init() {
	viper.SetDefault("redis", map[string]interface{}{
		"host": "localhost",
		"port": 6379,
		"db":   8,
	})

	viper.SetDefault("rabbitmq", map[string]interface{}{
		"user":     "guest",
		"password": "guest",
		"host":     "localhost",
		"port":     "5672",
		"virtual":  "h2o-dev",
	})

	viper.SetDefault("database", map[string]interface{}{
		"driver": "postgres",
		"args": map[string]interface{}{
			"host":     "localhost",
			"port":     5432,
			"user":     "postgres",
			"password": "",
			"dbname":   "h2o_dev",
			"sslmode":  "disable",
		},
		"pool": map[string]int{
			"max_open": 180,
			"max_idle": 6,
		},
	})

	viper.SetDefault("server", map[string]interface{}{
		"port":  8080,
		"ssl":   false,
		"name":  "localhost",
		"theme": "bootstrap",
	})

	viper.SetDefault("secrets", map[string]interface{}{
		"jwt":  web.Random(32),
		"aes":  web.Random(32),
		"hmac": web.Random(32),
	})

	viper.SetDefault("elasticsearch", map[string]interface{}{
		"host": "localhost",
		"port": 9200,
	})

	viper.SetDefault("languages", []string{
		language.AmericanEnglish.String(),
		language.SimplifiedChinese.String(),
		language.TraditionalChinese.String(),
	})

	web.Register(&Plugin{})
}
