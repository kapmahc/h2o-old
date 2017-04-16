package site

// GetHome home
// @router / [get]
func (p *Controller) GetHome() {
	p.Data["title"] = "site"
	p.TplName = "home.tpl"
}
