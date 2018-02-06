import { connect } from 'react-redux'
import Restaurant from './Restaurant'
import { fetchRestaurantThenDispatch } from '../actions'

export const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  restaurant: state.restaurant
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRestaurant: () => fetchRestaurantThenDispatch(ownProps.match.params.id, dispatch)
})

const RestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant)

export default RestaurantContainer
