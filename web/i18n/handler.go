package i18n

import (
	"math"

	"github.com/gin-gonic/gin"
	"golang.org/x/text/language"
)

const (
	// LOCALE locale key
	LOCALE = "locale"
)

// Middleware locale-middleware
func (p *I18n) Middleware(c *gin.Context) {
	write := false
	// 1. Check URL arguments.
	lang := c.Request.URL.Query().Get(LOCALE)

	// 2. Get language information from cookies.
	if len(lang) == 0 {
		if ck, er := c.Request.Cookie(LOCALE); er == nil {
			lang = ck.Value
		}
	} else {
		write = true
	}

	// 3. Get language information from 'Accept-Language'.
	if len(lang) == 0 {
		al := c.Request.Header.Get("Accept-Language")
		if len(al) > 4 {
			lang = al[:5] // Only compare first 5 letters.
		}
	}

	tag, _, _ := p.Matcher.Match(language.Make(lang))
	ts := tag.String()
	if ts != lang {
		write = true
	}
	if write {
		c.SetCookie(LOCALE, ts, math.MaxInt32, "/", "", false, false)
	}

	c.Set(LOCALE, ts)
}
