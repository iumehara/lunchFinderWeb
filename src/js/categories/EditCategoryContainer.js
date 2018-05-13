import {connect} from 'react-redux'
import {setDispatch} from '../actions'
import {addRestaurantCategory, getCategory, getRestaurants} from '../fetchers/resourceFetcher'
import EditCategory from './EditCategory'

export const mapStateToProps = state => ({
  category: state.category,
  restaurants: state.restaurants,
  restaurant: state.restaurant
})

export const mapDispatchToProps = (dispatch) => ({
  fetchCategory: id => {
    getCategory(id)
      .then(data => setDispatch(data, 'FETCH_CATEGORY', dispatch))
  },
  fetchRestaurants: () => {
    getRestaurants()
      .then(data => setDispatch(data, 'FETCH_RESTAURANTS', dispatch))
  },
  setRestaurantId: event => {
    setDispatch(event.target.value, 'SET_RESTAURANT_ID', dispatch)
  },
  addCategory: (restaurantId, categoryId) => {
    if (restaurantId > 0) {
      addRestaurantCategory(restaurantId, categoryId)
        .then(() => getCategory(categoryId))
        .then(data => setDispatch(data, 'FETCH_CATEGORY', dispatch))
    }
  }
})

const EditCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategory)

export default EditCategoryContainer
