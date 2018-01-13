import { fetchWrapper } from '../wrappers/fetchWrapper'

export const httpGet = (url) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  return fetchWrapper(url, {headers})
    .then(rawData => rawData.json())
}

export const httpPost = (url, data) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(data)

  return fetchWrapper(url, {headers, method, body})
    .then(rawData => rawData.json())
}

export const httpPut = (url, data) => {
  const headers = {'Content-Type': 'application/json'}
  const method = 'PUT'
  const body = JSON.stringify(data)

  return fetchWrapper(url, {headers, method, body})
}

export const httpDelete = (url) => {
  const method = 'DELETE'

  return fetchWrapper(url, {method})
}
