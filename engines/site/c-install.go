package site

import (
	"fmt"
	"path"

	"github.com/astaxie/beego"
	"github.com/steinbacher/goose"
)

func (p *Controller) dbConf() (*goose.DBConf, error) {
	drv := goose.DBDriver{
		Name: beego.AppConfig.String("databasedriver"),
		DSN:  beego.AppConfig.String("databasesource"),
	}
	switch drv.Name {
	case "postgres":
		drv.Import = "github.com/lib/pq"
		drv.Dialect = &goose.PostgresDialect{}
	case "mysql":
		drv.Import = "github.com/go-sql-driver/mysql"
		drv.Dialect = &goose.MySqlDialect{}
	default:
		return nil, fmt.Errorf("unsupported driver %s", drv.Name)
	}
	return &goose.DBConf{
		Driver:        drv,
		MigrationsDir: path.Join("db", drv.Name, "migrations"),
	}, nil
}
func (p *Controller) checkDatabase() error {
	cfg, err := p.dbConf()
	if err != nil {
		return err
	}

	target, err := goose.GetMostRecentDBVersion(cfg.MigrationsDir)
	if err != nil {
		return err
	}

	return goose.RunMigrations(cfg, cfg.MigrationsDir, target)
}

// GetInstall install
// @router /install [get]
func (p *Controller) GetInstall() {
	if err := p.checkDatabase(); err != nil {
		beego.Error(err)
		p.Abort("500")
	}
	p.TplName = "site/install.html"
}

// PostInstall install
// @router /install [post]
func (p *Controller) PostInstall() {
	// p.Data["title"] = "site"
	// p.TplName = "home.tpl"
}
