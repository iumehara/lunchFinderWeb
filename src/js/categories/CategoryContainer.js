import {connect} from 'react-redux'
import Category from './Category'
import {setDispatch} from '../actions'
import {getCategory, getRestaurants, httpPut} from '../httpFetcher'

export const mapStateToProps = state => ({
  category: state.category,
  restaurants: state.restaurants,
  restaurant: state.restaurant,
  addCategory: () => {
    if (state.restaurant.id > 0) {
      const url = `http://localhost:8080/restaurants/${state.restaurant.id}/categories/${state.category.id}`
      httpPut(url)
        .then(() => {console.log('hello')})
    }
  }
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
  }
})

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default CategoryContainer
