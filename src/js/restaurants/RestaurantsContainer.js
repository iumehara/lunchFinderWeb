import {connect} from 'react-redux'
import Restaurants from './Restaurants'
import {fetchRestaurantsThenDispatch} from '../actions'

const mapStateToProps = state => ({
  restaurants: state.restaurants
})

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: () => fetchRestaurantsThenDispatch(dispatch),
  clearCategory: () => dispatch({type: 'CLEAR_CATEGORY'})
})

const RestaurantsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants)

export default RestaurantsContainer
