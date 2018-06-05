import {getCategories, getRestaurant, getRestaurants} from './fetchers/resourceFetcher'

export const fetchCategoriesThenDispatch = dispatch => {
  getCategories()
    .then(data => dispatch({type: 'FETCH_CATEGORIES_SUCCESS', data}))
}

export const fetchRestaurantThenDispatch = (id, dispatch) => {
  getRestaurant(id)
    .then(data => dispatch({type: 'FETCH_RESTAURANT_SUCCESS', data}))
}

export const fetchRestaurantsThenDispatch = dispatch => {
  getRestaurants()
    .then(data => dispatch({type: 'FETCH_RESTAURANTS_SUCCESS', data}))
}

export const fetchNewRestaurantThenDispatch = (id, dispatch) => {
  getRestaurant(id)
    .then(data => dispatch({type: 'FETCH_NEW_RESTAURANT_SUCCESS', data}))
}

export const setDispatch = (data, type, dispatch) => {
  dispatch({type: `${type}_SUCCESS`, data})
}
