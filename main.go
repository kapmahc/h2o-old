package main

import (
	"github.com/astaxie/beego"
	_ "github.com/kapmahc/h2o/routers"
)

func main() {
	beego.Run()
}
