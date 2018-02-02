import { connect } from 'react-redux'
import RestaurantForm from './RestaurantForm'
import {
  fetchCategoriesThenDispatch,
  setDispatch
} from '../actions'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  categories: state.categories,
  saveButtonWasClicked: ownProps.saveButtonWasClicked,
  editMode: ownProps.editMode
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onInputChange: fieldObject => {
    setDispatch(fieldObject, 'SET_NEW_RESTAURANT_FIELD', dispatch)
  },
  onGeolocationChange: geoLocation => {
    setDispatch(geoLocation, 'SET_NEW_RESTAURANT_GEOLOCATION', dispatch)
  },
  onCategoryChange: event => {
    if (event.target.value && event.target.value > 0) {
      setDispatch(event.target.value, 'SET_NEW_RESTAURANT_CATEGORY_ID', dispatch)
    }
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
