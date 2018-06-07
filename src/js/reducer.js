// @flow
import {combineReducers} from 'redux'
import type {CategoryType} from './categories/CategoryTypes'
import {defaultCategory} from './categories/CategoryTypes'
import type {NewRestaurantType, RestaurantType} from './restaurants/RestaurantTypes'
import {defaultNewRestaurant, defaultRestaurant} from './restaurants/RestaurantTypes'

export const formError = (
  state: Object = {},
  action: Object
) => {
  const { type, data} = action
  switch (type) {
    case 'CREATE_CATEGORY_FAILURE':
      return data
    default:
      return state
  }
}

export const categories = (
  state: Array<CategoryType> = [],
  action: Object
) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return data
    case 'ORDER_BY_NAME':
      return data
                .slice()
                .sort((a, b) => (a.name < b.name) ? -1 : 1)
    case 'ORDER_BY_RESTAURANTS_COUNT':
      return data
                .slice()
                .sort((a, b) => (a.restaurantCount > b.restaurantCount) ? -1 : 1)
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
      const geolocation = Object.assign({}, state.geolocation, data)
      return Object.assign({}, state, {geolocation})
    case 'SET_NEW_RESTAURANT_CATEGORY_ID_SUCCESS':
      categoryIds = Array.from(new Set([...state.categoryIds, Number(data)]))
      return Object.assign({}, state, {categoryIds})
    case 'REMOVE_NEW_RESTAURANT_CATEGORY_ID_SUCCESS':
      categoryIds = state.categoryIds.filter(id => id !== Number(data))
      return Object.assign({}, state, {categoryIds})
    case 'RESET_NEW_RESTAURANT':
      return {categoryIds: []}
    default:
      return state
  }
}

export const formDataLoaded = (state: boolean=false, action: Object) => {
  const {type} = action
  switch (type) {
    case 'FETCH_NEW_RESTAURANT_SUCCESS':
      return true
    case 'RESET_FORM':
      return false
    default:
      return state
  }
}

export default combineReducers({
  formError,
  categories,
  category,
  newCategory,
  restaurants,
  restaurant,
  newRestaurant,
  formDataLoaded
})
