import {
  httpGet,
  getCategories,
  getRestaurant
} from './httpGet'

export const fetchCategoriesThenDispatch = dispatch => {
  getCategories()
    .then(data => dispatch({type: 'FETCH_CATEGORIES_SUCCESS', data}))
}

export const fetchNewRestaurantThenDispatch = (id, dispatch) => {
  getRestaurant(id)
    .then(data => dispatch({type: 'FETCH_NEW_RESTAURANT_SUCCESS', data}))
}

export const fetchThenDispatch = (url, type, dispatch) => {
  httpGet(url)
    .then(data => dispatch({type: type + '_SUCCESS', data}))
}

export const setDispatch = (data, type, dispatch) => {
  dispatch({type: `${type}_SUCCESS`, data})
}
