dist=dist
theme=bootstrap
pkg=github.com/kapmahc/sky

VERSION=`git rev-parse --short HEAD`
BUILD_TIME=`date -R`
AUTHOR_NAME=`git config --get user.name`
AUTHOR_EMAIL=`git config --get user.email`
COPYRIGHT=`head -n 1 LICENSE`
USAGE=`sed -n '3p' README.md`

build:
	mkdir -pv $(dist)/themes/$(theme)/public
	go build -ldflags "-s -w -X ${pkg}.Version=${VERSION} -X '${pkg}.BuildTime=${BUILD_TIME}' -X '${pkg}.AuthorName=${AUTHOR_NAME}' -X ${pkg}.AuthorEmail=${AUTHOR_EMAIL} -X '${pkg}.Copyright=${COPYRIGHT}' -X '${pkg}.Usage=${USAGE}'" -o ${dist}/fly main.go
	-cp -rv locales db $(dist)/
	-cp -rv themes/$(theme)/assets $(dist)/themes/$(theme)/public/
	-cp -rv themes/$(theme)/views $(dist)/themes/$(theme)/
	tar jcvf dist.tar.bz2 dist

clean:
	-rm -rv $(dist)
