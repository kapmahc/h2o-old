package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) showAttachment(c *gin.Context, l string) (interface{}, error) {
	var a Attachment
	err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error
	return a, err
}

type fmAttachmentNew struct {
	ResourceType string `form:"resourceType" binding:"required,max=255"`
	ResourceID   uint   `form:"resourceId"`
}

func (p *Plugin) createAttachment(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmAttachmentNew)
	user := c.MustGet(CurrentUser).(*User)
	if err := c.Request.ParseMultipartForm(10 * 1024); err != nil {
		return nil, err
	}

	var items []Attachment

	for _, f := range c.Request.MultipartForm.File["files"] {
		url, size, err := p.Uploader.Save(f)
		if err != nil {
			return nil, err
		}
		fd, err := f.Open()
		if err != nil {
			return nil, err
		}
		defer fd.Close()

		// http://golang.org/pkg/net/http/#DetectContentType
		buf := make([]byte, 512)
		if _, err = fd.Read(buf); err != nil {
			return nil, err
		}

		a := Attachment{
			Title:        f.Filename,
			URL:          url,
			UserID:       user.ID,
			MediaType:    http.DetectContentType(buf),
			Length:       size / 1024,
			ResourceID:   fm.ResourceID,
			ResourceType: fm.ResourceType,
		}
		if err := p.Db.Create(&a).Error; err != nil {
			return nil, err
		}
		items = append(items, a)
	}
	return items, nil
}

type fmAttachmentEdit struct {
	Title string `form:"title" binding:"required,max=255"`
}

func (p *Plugin) updateAttachment(c *gin.Context, l string, o interface{}) (interface{}, error) {
	fm := o.(*fmAttachmentEdit)
	a := c.MustGet("attachment").(*Attachment)
	err := p.Db.Model(a).Update("title", fm.Title).Error
	return gin.H{}, err
}

func (p *Plugin) destroyAttachment(c *gin.Context, l string) (interface{}, error) {
	a := c.MustGet("attachment").(*Attachment)
	if err := p.Db.Delete(a).Error; err != nil {
		return nil, err
	}
	if err := p.Uploader.Remove(a.URL); err != nil {
		return nil, err
	}
	return gin.H{}, nil
}

func (p *Plugin) indexAttachments(c *gin.Context, l string) (interface{}, error) {
	user := c.MustGet(CurrentUser).(*User)
	isa := c.MustGet(IsAdmin).(bool)
	var items []Attachment
	qry := p.Db
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	err := qry.Order("updated_at DESC").Find(&items).Error
	return items, err
}

func (p *Plugin) canEditAttachment(c *gin.Context) {
	user := c.MustGet(CurrentUser).(*User)

	var a Attachment
	err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error
	if err == nil {
		if user.ID == a.UserID || c.MustGet(IsAdmin).(bool) {
			c.Set("attachment", &a)
			c.Next()
			return
		}
		c.AbortWithStatus(http.StatusForbidden)
	} else {
		c.String(http.StatusInternalServerError, err.Error())
	}

}
