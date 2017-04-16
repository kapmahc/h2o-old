package site

import (
	"fmt"
	"net/http"
	"path"

	"github.com/astaxie/beego"
	"github.com/beego/i18n"
	"github.com/kapmahc/h2o/engines/base"
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

	title := i18n.Tr(p.Locale, "site.install_title")
	p.Data["title"] = title
	p.Data["form"] = p.NewForm(
		p.URLFor("site.Controller.PostInstall"),
		title,
		base.NewTextField("title", i18n.Tr(p.Locale, "attributes.title"), ""),
		base.NewTextField("subTitle", i18n.Tr(p.Locale, "site.attributes_subTitle"), ""),
		base.NewEmailField("email", i18n.Tr(p.Locale, "attributes.email"), ""),
		base.NewPasswordField("password", i18n.Tr(p.Locale, "attributes.password"), i18n.Tr(p.Locale, "helpers.password")),
		base.NewPasswordField("passwordConfirmation", i18n.Tr(p.Locale, "attributes.passwordConfirmation"), i18n.Tr(p.Locale, "helpers.passwordConfirmation")),
	)
	p.TplName = "form.html"
}

type fmInstall struct {
	Title                string `form:"title" valid:"Required"`
	SubTitle             string `form:"subTitle" valid:"Required"`
	Email                string `form:"email" valid:"Email; MaxSize(255)"`
	Password             string `form:"password" valid:"MinSize(6); MaxSize(32)"`
	PasswordConfirmation string `form:"passwordConfirmation"`
}

// PostInstall install
// @router /install [post]
func (p *Controller) PostInstall() {
	var url = p.URLFor("auth.Controller.GetSignIn")

	if err := p.HandleForm(&fmInstall{}, func(o interface{}) error {
		fm := o.(*fmInstall)
		beego.Debug(fm)
		return nil
	}); err != nil {
		url = p.URLFor("site.Controller.GetInstall")
	}
	p.Redirect(url, http.StatusFound)
}
