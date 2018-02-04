import {connect} from 'react-redux'
import Category from './Category'
import {setDispatch} from '../actions'
import {
  getCategory,
  getRestaurants,
  addRestaurantCategory
} from '../fetchers/resourceFetcher'

export const mapStateToProps = state => ({
  category: state.category,
  restaurants: state.restaurants,
  restaurant: state.restaurant
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
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

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default CategoryContainer
