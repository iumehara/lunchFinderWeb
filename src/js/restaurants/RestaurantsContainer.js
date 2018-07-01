import {connect} from 'react-redux'
import Restaurants from './Restaurants'
import {fetchRestaurantsThenDispatch} from '../actions'

const mapStateToProps = state => ({
  restaurants: state.restaurants
})

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: () => fetchRestaurantsThenDispatch(dispatch)
})

const RestaurantsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants)

export default RestaurantsContainer
