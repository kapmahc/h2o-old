package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/astaxie/beego/session/redis"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/kapmahc/h2o/routers"
	_ "github.com/lib/pq"
)

func main() {
	beego.Run()
}

func init() {
	orm.RegisterDataBase(
		"default",
		beego.AppConfig.String("databasedriver"),
		beego.AppConfig.String("databasesource"),
	)
}
