dist=build
theme=bootstrap
pkg=github.com/kapmahc/h2o/web

VERSION=`git rev-parse --short HEAD`
BUILD_TIME=`date -R`
AUTHOR_NAME=`git config --get user.name`
AUTHOR_EMAIL=`git config --get user.email`
COPYRIGHT=`head -n 1 LICENSE`
USAGE=`sed -n '3p' README.md`

build: backend frontend
	-cp -r dashboard/build/* $(dist)/
	-mv $(dist)/index.html $(dist)/dashboard.html
	-cp templates/index.html $(dist)/
	tar jcvf dist.tar.bz2 $(dist)

backend:
	go build -ldflags "-s -w -X ${pkg}.Version=${VERSION} -X '${pkg}.BuildTime=${BUILD_TIME}' -X '${pkg}.AuthorName=${AUTHOR_NAME}' -X ${pkg}.AuthorEmail=${AUTHOR_EMAIL} -X '${pkg}.Copyright=${COPYRIGHT}' -X '${pkg}.Usage=${USAGE}'" -o ${dist}/fly main.go
	-cp -rv locales db templates $(dist)/
	mkdir -pv $(dist)/themes/$(theme)
	-cp -rv themes/$(theme)/assets themes/$(theme)/views $(dist)/themes/$(theme)/

frontend:
	cd dashboard && npm run build

clean:
	-rm -rv $(dist) dashboard/build dist.tar.bz2

init:
	govendor sync
	cd dashboard && npm run install
