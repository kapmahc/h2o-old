package web

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/h2o/web/i18n"
)

// FORM wrap form handler
func FORM(fm interface{}, fn func(*gin.Context, interface{}) (gin.H, error)) gin.HandlerFunc {
	return JSON(func(c *gin.Context) (gin.H, error) {
		if err := c.Bind(fm); err != nil {
			return nil, err
		}
		return fn(c, fm)
	})
}

// HTML wrap html render
func HTML(f func(*gin.Context, string) (string, gin.H, error)) gin.HandlerFunc {
	return func(c *gin.Context) {
		if t, v, e := f(c, c.MustGet(i18n.LOCALE).(string)); e == nil {
			c.HTML(http.StatusOK, t, v)
		} else {
			log.Error(e)
			c.String(http.StatusInternalServerError, e.Error())
		}
	}
}

// XML wrap xml render
func XML(f func(*gin.Context) (gin.H, error)) gin.HandlerFunc {
	return func(c *gin.Context) {
		if v, e := f(c); e == nil {
			c.XML(http.StatusOK, v)
		} else {
			log.Error(e)
			c.String(http.StatusInternalServerError, e.Error())
		}
	}
}

// JSON wrap json render
func JSON(f func(*gin.Context) (gin.H, error)) gin.HandlerFunc {
	return func(c *gin.Context) {
		if v, e := f(c); e == nil {
			c.JSON(http.StatusOK, v)
		} else {
			log.Error(e)
			c.String(http.StatusInternalServerError, e.Error())
		}
	}
}
