package base

import (
	"os"
	"path/filepath"

	"github.com/astaxie/beego"
	"github.com/beego/i18n"
	"golang.org/x/text/language"
)

const (
	// LOCALE locale key
	LOCALE = "locale"
)

func (p *Controller) setLocale() {
	write := false

	// 1. Check URL arguments.
	lang := p.Input().Get(LOCALE)

	// 2. Get language information from cookies.
	if len(lang) == 0 {
		lang = p.Ctx.GetCookie(LOCALE)
	} else {
		write = true
	}

	// 3. Get language information from 'Accept-Language'.
	if len(lang) == 0 {
		al := p.Ctx.Request.Header.Get("Accept-Language")
		if len(al) > 4 {
			lang = al[:5] // Only compare first 5 letters.
		}
	}

	// 4. Default language is English.
	if !i18n.IsExist(lang) {
		lang = language.AmericanEnglish.String()
		write = true
	}

	// Save language information in cookies.
	if write {
		p.Ctx.SetCookie(LOCALE, lang, 1<<31-1, "/")
	}

	// Set language properties.
	p.Locale = lang
	p.Data[LOCALE] = lang
	p.Data["languages"] = i18n.ListLangs()
}

func loadLocales(root string) error {
	const EXT = ".ini"
	return filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		name := info.Name()
		ext := filepath.Ext(name)
		if ext != EXT {
			return nil
		}

		lang := name[:len(name)-len(EXT)]
		beego.Info("loading language:", lang)

		return i18n.SetMessage(lang, path)
	})
}

func init() {
	beego.AddFuncMap("t", i18n.Tr)

	// ---------------
	if err := loadLocales("locales"); err != nil {
		beego.Error(err)
	}
}
