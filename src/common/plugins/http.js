'use strict'
import axios from 'axios'
import ES6Promise from 'es6-promise'
ES6Promise.polyfill() // [ext] fix ie9 promise bug

axios.defaults.withCredentials = true

// [ext] axios request interceptors
axios.interceptors.request.use(
  config => {
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  }
)

// [ext] axios response interceptors
axios.interceptors.response.use(
  res => {
    if (res.data.code === '403') {
      window.location.href = res.data.message
    } else {
      return res
    }
  },
  err => {
    if (err.data) {
      switch (err.data.code) {
        case 401:
          window.location.href = err.data.message
          break
      }
      return Promise.reject(err.response)
    } else if (err.message && err.message.indexOf('Network Error') > -1) {
      // If the error occurs on request(401), it would be handled and cleaned by axios,
      // and only Network Error is returned( response is null)
      // window.location.href = 'http://' + window.API.LOGIN_HOST
      return Promise.reject(err)
    }
  })

const http = {}
http.timeout = 60000 // 60s 1min

http.get = function (url, params) {
  let config = {
    method: 'GET',
    url: url,
    params: params, // params : { key : value}
    timeout: this.timeout,
    headers: {
      'Content-Type': 'application/xxxx-form; charset=UTF-8'
    },
    responseType: 'json'
  }
  return axios(config)
}

http.post = function (url, obj) {
  let config = {
    method: 'POST',
    url: url,
    data: JSON.stringify(obj), // change obj to json obj
    timeout: this.timeout,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json'
  }
  return axios(config)
}

http.postNoObj = function (url, obj) {
  let config = {
    method: 'POST',
    url: url,
    data: obj, // change obj to string
    timeout: this.timeout,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json'
  }
  return axios(config)
}

export default http
