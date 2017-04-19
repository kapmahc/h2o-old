package vpn

import (
	"crypto/md5"
	"crypto/rand"
	"encoding/base64"
	"time"

	"github.com/kapmahc/h2o/web"
)

// http://chagridsada.blogspot.com/2011/01/openvpn-system-based-on-userpass.html

// User user
type User struct {
	web.Model
	FullName string    `json:"fullName"`
	Email    string    `json:"email"`
	Details  string    `json:"details"`
	Password string    `json:"password"`
	Online   bool      `json:"online"`
	Enable   bool      `json:"enable"`
	StartUp  time.Time `json:"startUp"`
	ShutDown time.Time `json:"shutDown"`
}

// TableName table name
func (User) TableName() string {
	return "vpn_users"
}

func (p *User) sum(password string, salt []byte) string {
	buf := md5.Sum(append([]byte(password), salt...))
	return base64.StdEncoding.EncodeToString(append(buf[:], salt...))
}

// SetPassword set  password (md5 with salt)
func (p *User) SetPassword(password string) error {
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return err
	}
	p.Password = p.sum(password, salt)
	return nil
}

// ChkPassword check password
func (p *User) ChkPassword(password string) bool {
	buf, err := base64.StdEncoding.DecodeString(p.Password)
	if err != nil {
		return false
	}

	return len(buf) > md5.Size && p.Password == p.sum(password, buf[md5.Size:])
}

// Log log
type Log struct {
	ID          uint       `json:"id"`
	TrustedIP   string     `json:"trustedIp"`
	TrustedPort uint       `json:"trustedPort"`
	RemoteIP    string     `json:"remoteIp"`
	RemotePort  uint       `json:"remotePort"`
	StartUp     time.Time  `json:"startUp"`
	ShutDown    *time.Time `json:"shutDown"`
	Received    float64    `json:"received"`
	Send        float64    `json:"send"`

	UserID uint `json:"userId"`
	User   User `json:"-"`
}

// TableName table name
func (Log) TableName() string {
	return "vpn_logs"
}
