import { connect } from 'react-redux'
import EditRestaurant from './EditRestaurant'
import {
  fetchThenDispatch,
  fetchCategoriesThenDispatch,
  fetchNewRestaurantThenDispatch,
  setDispatch
} from '../actions'
import { httpPut } from '../httpGet'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  categories: state.categories,
  updateNewRestaurant: () => {
    const url = `http://localhost:8080/restaurants/${state.newRestaurant.id}`
    httpPut(url, state.newRestaurant)
      .then(() => ownProps.history.push(`/restaurants/${state.newRestaurant.id}`))
  }
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onNameChange: event => {
    setDispatch(event.target.value, 'SET_NEW_RESTAURANT_NAME', dispatch)
  },
  onNameJpChange: event => {
    setDispatch(event.target.value, 'SET_NEW_RESTAURANT_NAME_JP', dispatch)
  },
  onCategoryChange: event => {
    setDispatch(event.target.value, 'SET_NEW_RESTAURANT_CATEGORY_ID', dispatch)
  },
  onRemoveCategory: event => {
    setDispatch(event.target.value, 'REMOVE_NEW_RESTAURANT_CATEGORY_ID', dispatch)
  },
  fetchCategories: () => {
    fetchCategoriesThenDispatch(dispatch)
  },
  fetchRestaurant: () => {
    fetchNewRestaurantThenDispatch(ownProps.match.params.id, dispatch)
  }
})

const EditRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRestaurant)

export default EditRestaurantContainer
