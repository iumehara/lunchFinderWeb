import { fetchWrapper } from './wrappers/fetchWrapper'

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
  const method = 'post'
  const body = JSON.stringify(data)

  return fetchWrapper(url, {headers, method, body})
    .then(rawData => rawData.json())
}
