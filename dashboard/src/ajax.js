import { push as _push } from 'react-router-redux'

import {TOKEN} from './constants'

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
  return fetch(path, options('get')).then(parse)
}

export const _delete = (path) => {
  return fetch(path, options('delete')).then(parse)
}

export const post = (path, body) => {
  var data = options('post')
  data.body = body
  return fetch(path,data).then(parse)
}

export const base = (path) => `/dashboard${path}`

export const push = (path) => _push(base(path))
