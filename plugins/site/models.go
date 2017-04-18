package site

import (
	"time"

	"github.com/kapmahc/h2o/web"
)

// Post post
type Post struct {
	web.Model
	Name  string
	Lang  string
	Title string
	Body  string `json:"body"`
	Type  string `json:"type"`
}

// TableName table name
func (Post) TableName() string {
	return "posts"
}

// Notice notice
type Notice struct {
	web.Model
	Lang string `json:"lang"`
	Body string `json:"body"`
	Type string `json:"type"`
}

// TableName table name
func (Notice) TableName() string {
	return "notices"
}

// LeaveWord leave-word
type LeaveWord struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	Body      string    `json:"body"`
	Type      string    `json:"type"`
}

// TableName table name
func (LeaveWord) TableName() string {
	return "leave_words"
}

// Link link
type Link struct {
	ID    uint   `gorm:"primary_key" json:"id"`
	Lang  string `json:"lang"`
	Loc   string `json:"loc"`
	Href  string `json:"href"`
	Label string `json:"label"`
	Sort  int    `json:"sort"`
}

// Page  page
type Page struct {
	ID      uint   `gorm:"primary_key" json:"id"`
	Lang    string `json:"lang"`
	Loc     string `json:"loc"`
	Title   string `json:"title"`
	Summary string `json:"summary"`
	Href    string `json:"href"`
	Logo    string `json:"logo"`
	Sort    int    `json:"sort"`
}
