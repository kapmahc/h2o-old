package main

import (
	"log"

	"github.com/kapmahc/h2o/web"
)

func main() {
	if err := web.Main(); err != nil {
		log.Fatal(err)
	}
}
