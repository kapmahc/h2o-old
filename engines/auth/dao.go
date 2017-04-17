package auth

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

// AddUser add user
func AddUser(name, email, password string) (*User, error) {
	o := orm.NewOrm()
	user := User{}
	if _, err := o.Insert(&user); err != nil {
		return nil, err
	}
	return &user, nil
}

// AddLog add log
func AddLog(user uint, message string) {
	o := orm.NewOrm()
	if _, err := o.Insert(&Log{}); err != nil {
		beego.Error(err)
	}
}
