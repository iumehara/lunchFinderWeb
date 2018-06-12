import {connect} from 'react-redux'
import Restaurant from './Restaurant'
import {fetchRestaurantThenDispatch} from '../actions'

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  category: state.category,
  restaurant: state.restaurant,
  restaurants: state.restaurants
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRestaurant: () => fetchRestaurantThenDispatch(ownProps.match.params.id, dispatch)
})

const RestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant)

export default RestaurantContainer
