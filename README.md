# H2O

A complete open source e-commerce solution for the Go language(STILL IN DEVELOPMENT).

## Install go

```bash
zsh < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
gvm install go1.8.1 -B
gvm use go1.8.1 --default
go get -u github.com/kardianos/govendor
go get -u github.com/kapmahc/h2o
cd $GOPATH/src/github.com/kapmahc/h2o
make
ls -l dist
```

## Editors

### Atom

- atom-beautify
- go-plus
- react
