import { httpGet, httpPost, httpPut, httpDelete } from './httpFetcher'

const SERVER_URL = process.env.SERVER_URL

export const getCategories = () => {
  const url = `${SERVER_URL}categories`
  return httpGet(url)
}

export const getCategory = id => {
  const url = `${SERVER_URL}categories/${id}`
  return httpGet(url)
}

export const createCategory = newCategory => {
  const url = `${SERVER_URL}categories/`
  return httpPost(url, newCategory)
}

export const destroyCategory = id => {
  const url = `${SERVER_URL}categories/${id}`
  return httpDelete(url)
}

export const getRestaurants = () => {
  const url = `${SERVER_URL}restaurants`
  return httpGet(url)
}

export const getRestaurant = id => {
  const url = `${SERVER_URL}restaurants/${id}`
  return httpGet(url)
}

export const createRestaurant = newRestaurant => {
  const url = `${SERVER_URL}restaurants/`
  return httpPost(url, newRestaurant)
}

export const updateRestaurant = (id, newRestaurant) => {
  const url = `${SERVER_URL}restaurants/${id}`
  return httpPut(url, newRestaurant)
}

export const destroyRestaurant = id => {
  const url = `${SERVER_URL}restaurants/${id}`
  return httpDelete(url)
}

export const addRestaurantCategory = (restaurantId, categoryId) => {
  const url = `${SERVER_URL}restaurants/${restaurantId}/categories/${categoryId}`
  return httpPut(url)
}

export const removeRestaurantCategory = (restaurantId, categoryId) => {
  const url = `${SERVER_URL}restaurants/${restaurantId}/categories/${categoryId}`
  return httpDelete(url)
}
