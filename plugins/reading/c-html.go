package reading

import (
	"bytes"
	"errors"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"path"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/epub"
	"github.com/kapmahc/h2o/web"
)

func (p *Plugin) indexNotesHTML(c *gin.Context, _ string) (gin.H, error) {

	var total int64
	var pag *web.Pagination
	if err := p.Db.Model(&Note{}).Count(&total).Error; err != nil {
		return nil, err
	}

	pag = web.NewPagination(c.Request, total)
	var notes []Note
	if err := p.Db.
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&notes).Error; err != nil {
		return nil, err
	}

	for _, it := range notes {
		pag.Items = append(pag.Items, it)
	}

	return gin.H{"pager": pag}, nil
}

// -----------------

func (p *Plugin) indexBooksHTML(c *gin.Context, _ string) (gin.H, error) {
	var total int64
	if err := p.Db.Model(&Book{}).Count(&total).Error; err != nil {
		return nil, err
	}
	pag := web.NewPagination(c.Request, total)

	var books []Book
	if err := p.Db.
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&books).Error; err != nil {
		return nil, err
	}
	for _, b := range books {
		pag.Items = append(pag.Items, b)
	}

	return gin.H{"pager": pag}, nil
}

func (p *Plugin) showBookHTML(c *gin.Context, _ string) (gin.H, error) {
	id := c.Param("id")
	var buf bytes.Buffer
	it, bk, err := p.readBook(id)
	if err != nil {
		return nil, err
	}
	var notes []Note
	if err := p.Db.Order("updated_at DESC").Find(&notes).Error; err != nil {
		return nil, err
	}

	// c.Writer.Header().Set("Content-Type", "text/html; charset=utf-8")
	p.writePoints(
		&buf,
		fmt.Sprintf("%s/reading/pages/%s", web.Home(), id),
		bk.Ncx.Points,
	)

	return gin.H{
		"notes":   notes,
		"book":    it,
		"homeage": template.HTML(buf.String()),
	}, nil
}

func (p *Plugin) showPageHTML(c *gin.Context) {
	err := p.readBookPage(c.Writer, c.Param("id"), c.Param("href")[1:])
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
	}
}

// -----------------------

func (p *Plugin) readBookPage(w http.ResponseWriter, id string, name string) error {
	_, bk, err := p.readBook(id)
	if err != nil {
		return err
	}
	for _, fn := range bk.Files() {
		if strings.HasSuffix(fn, name) {
			for _, mf := range bk.Opf.Manifest {
				if mf.Href == name {
					rdr, err := bk.Open(name)
					if err != nil {
						return err
					}
					defer rdr.Close()
					body, err := ioutil.ReadAll(rdr)
					if err != nil {
						return err
					}
					w.Header().Set("Content-Type", mf.MediaType)
					w.Write(body)
					return nil
				}
			}
		}
	}
	return errors.New("not found")
}

func (p *Plugin) writePoints(wrt io.Writer, href string, points []epub.NavPoint) {
	wrt.Write([]byte("<ol>"))
	for _, it := range points {
		wrt.Write([]byte("<li>"))
		fmt.Fprintf(
			wrt,
			`<a href="%s/%s" target="_blank">%s</a>`,
			href,
			it.Content.Src,
			it.Text,
		)
		p.writePoints(wrt, href, it.Points)
		wrt.Write([]byte("</li>"))
	}
	wrt.Write([]byte("</ol>"))
}

func (p *Plugin) readBook(id string) (*Book, *epub.Book, error) {
	var book Book
	if err := p.Db.
		Where("id = ?", id).First(&book).Error; err != nil {
		return nil, nil, err
	}
	bk, err := epub.Open(path.Join(p.root(), book.File))
	return &book, bk, err
}
