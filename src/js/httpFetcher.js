import { fetchWrapper } from './wrappers/fetchWrapper'

export const getCategories = () => {
  const url = 'http://localhost:8080/categories'
  return httpGet(url)
}

export const getCategory = id => {
  const url = `http://localhost:8080/categories/${id}`
  return httpGet(url)
}

export const getRestaurants = () => {
  const url = 'http://localhost:8080/restaurants'
  return httpGet(url)
}

export const getRestaurant = id => {
  const url = `http://localhost:8080/restaurants/${id}`
  return httpGet(url)
}

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
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const method = 'PUT'
  const body = JSON.stringify(data)

  return fetchWrapper(url, {headers, method, body})
}
