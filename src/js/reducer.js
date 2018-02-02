// @flow
import { combineReducers } from 'redux'
import type { CategoryType } from './categories/CategoryTypes'
import { defaultCategory } from './categories/CategoryTypes'
import type { RestaurantType, NewRestaurantType } from './restaurants/RestaurantTypes'
import { defaultRestaurant, defaultNewRestaurant } from './restaurants/RestaurantTypes'

export const categories = (
  state: Array<CategoryType> = [],
  action: Object
) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return data
    default:
      return state
  }
}

export const category = (
  state: CategoryType = defaultCategory,
  action: Object
) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_CATEGORY_SUCCESS':
      return Object.assign({}, state, data)
    default:
      return state
  }
}

export const newCategory = (
  state: CategoryType = defaultCategory,
  action: Object
) => {
  const {type, data} = action
  switch (type) {
    case 'SET_NEW_CATEGORY_NAME_SUCCESS':
      return Object.assign({}, state, {name: data})
    default:
      return state
  }
}

export const restaurants = (
  state: Array<RestaurantType> = [],
  action: Object
) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_RESTAURANTS_SUCCESS':
      return data
    default:
      return state
  }
}

export const restaurant = (
  state: RestaurantType = defaultRestaurant,
  action: Object
) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_RESTAURANT_SUCCESS':
      return data
    case 'SET_RESTAURANT_ID_SUCCESS':
      return {id: data}
    default:
      return state
  }
}

export const newRestaurant = (
  state: NewRestaurantType = defaultNewRestaurant,
  action: Object
) => {
  const {type, data} = action
  let categoryIds
  switch (type) {
    case 'FETCH_NEW_RESTAURANT_SUCCESS':
      return Object.assign({}, data, {categoryIds: data.categories.map(category => category.id)})
    case 'SET_NEW_RESTAURANT_FIELD_SUCCESS':
      return Object.assign({}, state, data)
    case 'SET_NEW_RESTAURANT_GEOLOCATION_SUCCESS':
      const geoLocation = Object.assign({}, state.geoLocation, data)
      return Object.assign({}, state, {geoLocation})
    case 'SET_NEW_RESTAURANT_CATEGORY_ID_SUCCESS':
      categoryIds = Array.from(new Set([...state.categoryIds, Number(data)]))
      return Object.assign({}, state, {categoryIds})
    case 'REMOVE_NEW_RESTAURANT_CATEGORY_ID_SUCCESS':
      categoryIds = state.categoryIds.filter(id => id !== Number(data))
      return Object.assign({}, state, {categoryIds})
    default:
      return state
  }
}

export default combineReducers({
  categories,
  category,
  newCategory,
  restaurants,
  restaurant,
  newRestaurant
})
