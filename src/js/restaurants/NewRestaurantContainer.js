import { connect } from 'react-redux'
import NewRestaurant from './NewRestaurant'
import {
  fetchThenDispatch,
  setDispatch
} from '../actions'
import { httpPost } from '../httpGet'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  createNewRestaurant: () => {
    const url = 'http://localhost:8080/restaurants/'
    httpPost(url, state.newRestaurant)
      .then(id => ownProps.history.push(`/restaurants/${id}`))
  },
  categories: state.categories
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onNameChange: (event) => {
    setDispatch(event.target.value, 'SET_NEW_RESTAURANT_NAME', dispatch)
  },
  onCategoryChange: event => {
    setDispatch(event.target.value, 'SET_NEW_RESTAURANT_CATEGORY_ID', dispatch)
  },
  onRemoveCategory: event => {
    setDispatch(event.target.value, 'REMOVE_NEW_RESTAURANT_CATEGORY_ID', dispatch)
  },
  fetchCategories: () => {
    const url = 'http://localhost:8080/categories'
    fetchThenDispatch(url, 'FETCH_CATEGORIES', dispatch)
  }
})

const NewRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRestaurant)

export default NewRestaurantContainer
