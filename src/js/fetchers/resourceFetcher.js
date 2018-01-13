import { httpGet } from './httpFetcher'

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
