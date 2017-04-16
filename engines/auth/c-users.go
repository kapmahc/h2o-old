package auth

// GetSignIn sign-in
// @router /users/sign-in [get]
func (p *Controller) GetSignIn() {
	p.Data["title"] = "sign in"
	p.TplName = "home.tpl"
}
