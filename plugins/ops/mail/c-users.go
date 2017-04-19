package mail

import "github.com/gin-gonic/gin"

func (p *Plugin) indexUsers(c *gin.Context, _ string) (interface{}, error) {

	var items []User
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return nil, err
	}
	// TODO left join
	var domains []Domain
	if err := p.Db.Select([]string{"id", "name"}).Find(&domains).Error; err != nil {
		return nil, err
	}
	for i := range items {
		u := &items[i]
		for _, d := range domains {
			if d.ID == u.DomainID {
				u.Domain = d
				break
			}
		}
	}

	return items, nil
}

type fmUserNew struct {
	FullName             string `form:"fullName" binding:"required,max=255"`
	Email                string `form:"email" binding:"required,email"`
	Password             string `form:"password" binding:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" binding:"eqfield=Password"`
	Enable               bool   `form:"enable"`
	DomainID             uint   `form:"domainId"`
}

func (p *Plugin) createUser(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmUserNew)
	user := User{
		FullName: fm.FullName,
		Email:    fm.Email,
		Enable:   fm.Enable,
		DomainID: fm.DomainID,
	}
	if err := user.SetPassword(fm.Password); err != nil {
		return nil, err
	}
	if err := p.Db.Create(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

type fmUserEdit struct {
	FullName string `form:"fullName" binding:"required,max=255"`
	Enable   bool   `form:"enable"`
}

func (p *Plugin) updateUser(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmUserEdit)

	if err := p.Db.Model(&User{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"enable":    fm.Enable,
			"full_name": fm.FullName,
		}).Error; err != nil {
		return nil, err
	}
	return gin.H{}, nil
}

type fmUserResetPassword struct {
	Password             string `form:"password" binding:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" binding:"eqfield=Password"`
}

func (p *Plugin) resetUserPassword(c *gin.Context, _ string, o interface{}) (interface{}, error) {
	fm := o.(*fmUserResetPassword)
	var item User
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return nil, err
	}
	if err := item.SetPassword(fm.Password); err != nil {
		return nil, err
	}
	if err := p.Db.Model(&item).
		Updates(map[string]interface{}{
			"password": item.Password,
		}).Error; err != nil {
		return nil, err
	}

	return gin.H{}, nil
}

type fmUserChangePassword struct {
	Email                string `form:"email" binding:"required,email"`
	CurrentPassword      string `form:"currentPassword" binding:"required"`
	NewPassword          string `form:"newPassword" binding:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" binding:"eqfield=NewPassword"`
}

func (p *Plugin) changeUserPassword(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(fmUserChangePassword)
	var user User
	if err := p.Db.Where("email = ?", fm.Email).First(&user).Error; err != nil {
		return nil, err
	}
	if !user.ChkPassword(fm.CurrentPassword) {
		return nil, p.I18n.E(l, "ops.mail.users.email-password-not-match")
	}
	if err := user.SetPassword(fm.NewPassword); err != nil {
		return nil, err
	}

	if err := p.Db.Model(user).
		Updates(map[string]interface{}{
			"password": user.Password,
		}).Error; err != nil {
		return nil, err
	}

	return gin.H{}, nil
}

func (p *Plugin) destroyUser(c *gin.Context, l string) (interface{}, error) {
	var user User
	if err := p.Db.
		Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		return nil, err
	}
	var count int
	if err := p.Db.Model(&Alias{}).Where("destination = ?", user.Email).Count(&count).Error; err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, p.I18n.E(l, "errors.in-use")
	}
	err := p.Db.Delete(&user).Error
	return gin.H{}, err
}
