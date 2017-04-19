# H2O

A complete open source e-commerce solution for the Go language(STILL IN DEVELOPMENT).

## Install go

on archlinux

```bash
sudo pacman -S go
```

append to your ~/.zshrc

```bash
GOPATH=/opt/go
PATH=$GOPATH/bin:$PATH
export GOPATH PATH
```

install packages

```bash
go get -u github.com/kardianos/govendor
go get -u github.com/kapmahc/h2o
cd $GOPATH/src/github.com/kapmahc/h2o
make init
make
ls -l dist
```

## Editors

### Atom

- atom-beautify
- go-plus
- react

## Development
```bash
cd $GOPATH/src/github.com/kapmahc/h2o
./run.sh # start backend server
cd dashboard && npm start # start frontend server
```

## Deployment
```bash
echo 'REACT_APP_BACKEND=http://www.change-me.com' > dashboard/.env
make
cd build
./fly g c # generate config.toml
./fly g ng # generate nginx.conf
vi config.toml # change server.name, server.ssl ...etc
./fly -h
```
