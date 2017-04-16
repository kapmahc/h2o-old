package base

import (
	"bytes"
	"errors"
	"fmt"
	"html/template"
	"net/http"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	"github.com/google/uuid"
)

// HandleForm handle form
func (p *Controller) HandleForm(fm interface{}, fn func(interface{}) error) error {
	flash := beego.NewFlash()
	err := p.BindForm(fm)
	if err == nil {
		err = fn(fm)
	}
	if err != nil {
		flash.Error(err.Error())
	}
	flash.Store(&p.Controller)
	return err
}

// BindForm bind form
func (p *Controller) BindForm(fm interface{}) error {
	if err := p.ParseForm(fm); err != nil {
		return err
	}
	var valid validation.Validation
	ok, err := valid.Valid(fm)
	if err != nil {
		return err
	}
	if !ok {
		var buf bytes.Buffer
		buf.WriteString("<ol>")
		for _, err := range valid.Errors {
			fmt.Fprintf(&buf, "<li>%s: %s</li>", err.Key, err.Message)
		}
		buf.WriteString("</ol>")
		return errors.New(buf.String())
	}
	return nil
}

// NewForm new form
func (p *Controller) NewForm(action, title string, fields ...interface{}) Form {
	return Form{
		"id":     uuid.New().String(),
		"locale": p.Locale,
		"method": http.MethodPost,
		"action": action,
		"title":  title,
		"fields": fields,
		"xsrf":   template.HTML(p.XSRFFormHTML()),
	}
}

// Form form
type Form map[string]interface{}

// Method set method
func (p Form) Method(m string) {
	p["method"] = m
}

// Field field
type Field map[string]interface{}

// Readonly set readonly
func (p Field) Readonly() {
	p["readonly"] = true
}

// Helper set helper message
func (p Field) Helper(h string) {
	p["helper"] = h
}

// NewTextarea new textarea field
func NewTextarea(id, label, value string, row int) Field {
	return Field{
		"id":    id,
		"type":  "textarea",
		"label": label,
		"value": value,
		"row":   3,
	}
}

// NewTextField new text field
func NewTextField(id, label, value string) Field {
	return Field{
		"id":    id,
		"type":  "text",
		"label": label,
		"value": value,
	}
}

// NewHiddenField new hidden field
func NewHiddenField(id string, value interface{}) Field {
	return Field{
		"id":    id,
		"type":  "hidden",
		"value": value,
	}
}

// NewEmailField new email field
func NewEmailField(id, label, value string) Field {
	return Field{
		"id":    id,
		"type":  "email",
		"label": label,
		"value": value,
	}
}

// NewPasswordField new password field
func NewPasswordField(id, label, helper string) Field {
	return Field{
		"id":     id,
		"type":   "password",
		"label":  label,
		"helper": helper,
	}
}
