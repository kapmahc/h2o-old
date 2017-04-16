package routers

import (
	"github.com/astaxie/beego"
	"github.com/kapmahc/h2o/engines/auth"
	"github.com/kapmahc/h2o/engines/forum"
	"github.com/kapmahc/h2o/engines/ops/mail"
	"github.com/kapmahc/h2o/engines/ops/vpn"
	"github.com/kapmahc/h2o/engines/reading"
	"github.com/kapmahc/h2o/engines/shop"
	"github.com/kapmahc/h2o/engines/site"
)

func init() {
	beego.Include(
		&site.Controller{},
		&auth.Controller{},
	)

	for k, v := range map[string]beego.ControllerInterface{
		"/forum":    &forum.Controller{},
		"/reading":  &reading.Controller{},
		"/shop":     &shop.Controller{},
		"/ops/mail": &mail.Controller{},
		"/ops/vpn":  &vpn.Controller{},
	} {
		beego.AddNamespace(beego.NewNamespace(k, beego.NSInclude(v)))
	}

}
