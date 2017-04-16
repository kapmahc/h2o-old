package site

import (
	"os"
	"path/filepath"

	"github.com/astaxie/beego"
	"github.com/beego/i18n"
)

func init() {
	const EXT = ".ini"
	if err := filepath.Walk("locales", func(path string, info os.FileInfo, err error) error {
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
	}); err != nil {
		beego.Error(err)
	}
}
