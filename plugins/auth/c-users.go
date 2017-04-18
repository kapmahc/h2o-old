package auth

import "github.com/gin-gonic/gin"

func (p *Plugin) indexUsers(c *gin.Context, l string) (gin.H, error) {
	var users []User
	err := p.Db.
		Select([]string{"name", "logo", "home"}).
		Order("last_sign_in_at DESC").
		Find(&users).Error
	return gin.H{"users": users}, err
}
