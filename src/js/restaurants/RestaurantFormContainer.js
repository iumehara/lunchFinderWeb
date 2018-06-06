import {connect} from 'react-redux'
import RestaurantForm from './RestaurantForm'
import {fetchCategoriesThenDispatch, setDispatch} from '../actions'

const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  categories: state.categories,
  saveButtonWasClicked: ownProps.saveButtonWasClicked,
  editMode: ownProps.editMode,
  formDataLoaded: state.formDataLoaded
})

const mapDispatchToProps = (dispatch) => ({
  onInputChange: fieldObject => {
    setDispatch(fieldObject, 'SET_NEW_RESTAURANT_FIELD', dispatch)
  },
  onGeolocationChange: geolocation => {
    setDispatch(geolocation, 'SET_NEW_RESTAURANT_GEOLOCATION', dispatch)
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
  },
  resetForm: () => dispatch({type: 'RESET_FORM'})
})

const RestaurantFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantForm)

export default RestaurantFormContainer
