package auth

// GetHome home
// @router / [get]
func (p *Controller) GetHome() {
	p.Data["title"] = "home"
	p.TplName = "home.tpl"
}
