import {TOKEN} from './constants'

export const backend = (path) => {
  return `${process.env.REACT_APP_BACKEND}${path}`
}

const parse = (res) => {
  // res.status === 200 || res.status === 0
  return res.ok ?
    res.json() :
    res.text().then(err => {throw err;})
}

const options = (method) => {
  return {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Authorization': `BEARER ${window.sessionStorage.getItem(TOKEN)}`
    }
  }
}

export const get = (path) => {
  return fetch(backend(path), options('get')).then(parse)
}

export const _delete = (path) => {
  return fetch(backend(path), options('delete')).then(parse)
}

export const post = (path, body) => {
  var data = options('post')
  data.body = body
  return fetch(backend(path),data).then(parse)
}
