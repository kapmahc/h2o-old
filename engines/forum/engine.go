package forum

import "github.com/astaxie/beego"

// Controller controller
type Controller struct {
	beego.Controller
}

// GetHome home
// @router / [get]
func (p *Controller) GetHome() {
	p.Data["title"] = "forum"
	p.TplName = "home.tpl"
}
