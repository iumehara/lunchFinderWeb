import { httpGet } from './httpFetcher'

const SERVER_URL = process.env.SERVER_URL

export const getCategories = () => {
  const url = `${SERVER_URL}categories`
  console.log('url', url)
  return httpGet(url)
}

export const getCategory = id => {
  const url = `${SERVER_URL}categories/${id}`
  return httpGet(url)
}

export const getRestaurants = () => {
  const url = `${SERVER_URL}restaurants`
  return httpGet(url)
}

export const getRestaurant = id => {
  const url = `${SERVER_URL}restaurants/${id}`
  return httpGet(url)
}
