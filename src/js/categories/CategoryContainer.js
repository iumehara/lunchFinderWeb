import {connect} from 'react-redux'
import Category from './Category'
import {setDispatch} from '../actions'
import {httpPut} from '../fetchers/httpFetcher'
import {getCategory, getRestaurants} from '../fetchers/resourceFetcher'

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
      const url = `http://localhost:8080/restaurants/${restaurantId}/categories/${categoryId}`
      httpPut(url)
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
