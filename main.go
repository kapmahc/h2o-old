package main

import (
	"log"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/kapmahc/h2o/plugins/forum"
	_ "github.com/kapmahc/h2o/plugins/ops/mail"
	_ "github.com/kapmahc/h2o/plugins/ops/vpn"
	_ "github.com/kapmahc/h2o/plugins/reading"
	_ "github.com/kapmahc/h2o/plugins/shop"
	_ "github.com/kapmahc/h2o/plugins/site"
	"github.com/kapmahc/h2o/web"
)

func main() {
	if err := web.Main(); err != nil {
		log.Fatal(err)
	}
}
