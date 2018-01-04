import { combineReducers } from 'redux'

export const categories = (state=[], action) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return data
    default:
      return state
  }
}

export const category = (state={restaurants: []}, action) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_CATEGORY_SUCCESS':
      return data
    default:
      return state
  }
}

export const restaurant = (state={categories: []}, action) => {
  const {type, data} = action
  switch (type) {
    case 'FETCH_RESTAURANT_SUCCESS':
      return data
    default:
      return state
  }
}

export const newRestaurant = (state={categories: []}, action) => {
  const {type, data} = action
  switch (type) {
    case 'SET_NEW_RESTAURANT_SUCCESS':
      return data
    default:
      return state
  }
}

export default combineReducers({
  categories,
  category,
  restaurant,
  newRestaurant
})
