package auth

import (
	"time"

	"github.com/SermoDigital/jose/jws"
	"github.com/gin-gonic/gin"
)

func (p *Plugin) deleteUsersSignOut(c *gin.Context, l string) (interface{}, error) {
	user := c.MustGet(CurrentUser).(*User)
	p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(l, "auth.logs.sign-out"))
	// TODO remove kid
	return gin.H{}, nil
}

type fmInfo struct {
	Name string `form:"name" binding:"required,max=255"`
	Home string `form:"home" binding:"max=255"`
	Logo string `form:"logo" binding:"max=255"`
}

func (p *Plugin) getUsersInfo(c *gin.Context, l string) (interface{}, error) {
	user := c.MustGet(CurrentUser).(*User)
	return user, nil
}

func (p *Plugin) postUsersInfo(c *gin.Context, l string, o interface{}) (interface{}, error) {
	user := c.MustGet(CurrentUser).(*User)
	fm := o.(*fmInfo)
	err := p.Db.Model(user).Where("id = ?", user.ID).Updates(map[string]interface{}{
		"home": fm.Home,
		"logo": fm.Logo,
		"name": fm.Name,
	}).Error

	return gin.H{}, err
}

type fmChangePassword struct {
	CurrentPassword      string `form:"currentPassword" binding:"required"`
	NewPassword          string `form:"newPassword" binding:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" binding:"eqfield=NewPassword"`
}

func (p *Plugin) postUsersChangePassword(c *gin.Context, l string, o interface{}) (interface{}, error) {
	user := c.MustGet(CurrentUser).(*User)
	fm := o.(*fmChangePassword)
	if !p.Hmac.Chk([]byte(fm.CurrentPassword), user.Password) {
		return nil, p.I18n.E(l, "auth.errors.bad-password")
	}
	err := p.Db.Model(user).Where("id = ?", user.ID).Update("password", p.Hmac.Sum([]byte(fm.NewPassword))).Error
	return gin.H{}, err
}

func (p *Plugin) getUsersLogs(c *gin.Context, l string) (interface{}, error) {
	user := c.MustGet(CurrentUser).(*User)
	var logs []Log
	err := p.Db.
		Select([]string{"ip", "message", "created_at"}).
		Where("user_id = ?", user.ID).
		Order("id DESC").Limit(120).
		Find(&logs).Error
	return logs, err
}

// ------------------------------------------------------------------

type fmResetPassword struct {
	Token                string `form:"token" binding:"required"`
	Password             string `form:"password" binding:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" binding:"eqfield=Password"`
}

func (p *Plugin) postUsersResetPassword(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmResetPassword)
	user, err := p.parseToken(l, fm.Token, actResetPassword)
	if err != nil {
		return nil, err
	}
	p.Db.Model(user).Update("password", p.Hmac.Sum([]byte(fm.Password)))
	p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(l, "auth.logs.reset-password"))

	return gin.H{}, err
}

func (p *Plugin) getUsersUnlockToken(c *gin.Context, l string) (string, error) {
	token := c.Param("token")
	user, err := p.parseToken(l, token, actUnlock)
	if err != nil {
		return "", err
	}
	if !user.IsLock() {
		return "", p.I18n.E(l, "auth.errors.user-not-lock")
	}

	p.Db.Model(user).Update(map[string]interface{}{"locked_at": nil})
	p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(l, "auth.logs.unlock"))

	return p.signInURL(), nil
}

func (p *Plugin) getUsersConfirmToken(c *gin.Context, l string) (string, error) {
	token := c.Param("token")

	user, err := p.parseToken(l, token, actConfirm)
	if err != nil {
		return "", err
	}
	if user.IsConfirm() {
		return "", p.I18n.E(l, "auth.errors.user-already-confirm")
	}

	p.Db.Model(user).Update("confirmed_at", time.Now())
	p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(l, "auth.logs.confirm"))

	return p.signInURL(), nil
}

func (p *Plugin) signInURL() string {
	return "/dashboard/users/sign-in"
}

type fmEmail struct {
	Email string `form:"email" binding:"required,email"`
}

func (p *Plugin) postUsersConfirm(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmEmail)
	user, err := p.Dao.GetByEmail(fm.Email)
	if err != nil {
		return nil, err
	}

	if user.IsConfirm() {
		return nil, p.I18n.E(l, "auth.errors.user-already-confirm")
	}

	p.sendEmail(l, user, actConfirm)
	return gin.H{}, nil
}

func (p *Plugin) postUsersUnlock(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmEmail)
	user, err := p.Dao.GetByEmail(fm.Email)
	if err != nil {
		return nil, err
	}
	if !user.IsLock() {
		return nil, p.I18n.E(l, "auth.errors.user-not-lock")
	}

	p.sendEmail(l, user, actUnlock)
	return gin.H{}, nil
}

func (p *Plugin) postUsersForgotPassword(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmEmail)
	var user *User
	user, err := p.Dao.GetByEmail(fm.Email)
	if err != nil {
		return nil, err
	}

	p.sendEmail(l, user, actResetPassword)
	return gin.H{}, nil
}

type fmSignIn struct {
	Email      string `form:"email" binding:"required,email"`
	Password   string `form:"password" binding:"required"`
	RememberMe bool   `form:"rememberMe"`
}

func (p *Plugin) postUsersSignIn(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmSignIn)
	ip := c.ClientIP()

	user, err := p.Dao.GetByEmail(fm.Email)
	if err != nil {
		return nil, err
	}
	if !p.Hmac.Chk([]byte(fm.Password), user.Password) {
		p.Dao.Log(user.ID, ip, p.I18n.T(l, "auth.logs.sign-in-failed"))
		return nil, p.I18n.E(l, "auth.errors.email-password-not-match")
	}

	if !user.IsConfirm() {
		return nil, p.I18n.E(l, "auth.errors.user-not-confirm")
	}

	if user.IsLock() {
		return nil, p.I18n.E(l, "auth.errors.user-is-lock")
	}

	p.Dao.Log(user.ID, ip, p.I18n.T(l, "auth.logs.sign-in-success"))
	user.SignInCount++
	user.LastSignInAt = user.CurrentSignInAt
	user.LastSignInIP = user.CurrentSignInIP
	now := time.Now()
	user.CurrentSignInAt = &now
	user.CurrentSignInIP = ip
	if err = p.Db.Model(user).Updates(map[string]interface{}{
		"last_sign_in_at":    user.LastSignInAt,
		"last_sign_in_ip":    user.LastSignInIP,
		"current_sign_in_at": user.CurrentSignInAt,
		"current_sign_in_ip": user.CurrentSignInIP,
		"sign_in_count":      user.SignInCount,
	}).Error; err != nil {
		return nil, err
	}

	cm := jws.Claims{}
	cm.Set(UID, user.UID)
	cm.Set("name", user.Name)
	cm.Set(IsAdmin, p.Dao.Is(user.ID, RoleAdmin))

	// TODO
	tkn, err := p.Jwt.Sum(cm, time.Hour*24*7)
	if err != nil {
		return nil, err
	}

	return gin.H{"token": string(tkn)}, nil
}

type fmSignUp struct {
	Name                 string `form:"name" binding:"required,max=255"`
	Email                string `form:"email" binding:"required,email"`
	Password             string `form:"password" binding:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" binding:"eqfield=Password"`
}

func (p *Plugin) postUsersSignUp(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmSignUp)

	var count int
	if err := p.Db.
		Model(&User{}).
		Where("email = ?", fm.Email).
		Count(&count).Error; err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, p.I18n.E(l, "auth.errors.email-already-exists")
	}
	user, err := p.Dao.AddEmailUser(fm.Name, fm.Email, fm.Password)
	if err != nil {
		return nil, err
	}

	p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(l, "auth.logs.sign-up"))
	p.sendEmail(l, user, actConfirm)
	return gin.H{}, nil
}
