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

export const newRestaurant = (state={categoryIds: []}, action) => {
  const {type, data} = action
  let categoryIds
  switch (type) {
    case 'SET_NEW_RESTAURANT_NAME_SUCCESS':
      return Object.assign({}, state, {name: data})
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
  restaurant,
  newRestaurant
})
