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

export default combineReducers({
  categories,
  category
})
