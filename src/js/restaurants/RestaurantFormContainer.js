import { connect } from 'react-redux'
import RestaurantForm from './RestaurantForm'
import {
  fetchCategoriesThenDispatch,
  setDispatch
} from '../actions'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  categories: state.categories,
  saveButtonWasClicked: ownProps.saveButtonWasClicked
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
  }
})

const RestaurantFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantForm)

export default RestaurantFormContainer
