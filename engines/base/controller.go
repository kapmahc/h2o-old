package base

import "github.com/astaxie/beego"

// Controller controller
type Controller struct {
	beego.Controller

	Locale string
}

// Prepare prepare
func (p *Controller) Prepare() {
	p.setLocale()
}
