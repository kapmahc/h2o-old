package web

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
)

// Wrap wrap render
func Wrap(f func(*gin.Context) error) gin.HandlerFunc {
	return func(c *gin.Context) {
		if e := f(c); e != nil {
			log.Error(e)
			c.String(http.StatusInternalServerError, e.Error())
		}
	}
}
