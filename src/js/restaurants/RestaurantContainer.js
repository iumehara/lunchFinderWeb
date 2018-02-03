import { connect } from 'react-redux'
import Restaurant from './Restaurant'
import {fetchThenDispatch} from '../actions'

export const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  restaurant: state.restaurant
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRestaurant: () => {
    const url = 'http://localhost:8080/restaurants/' + ownProps.match.params.id
    fetchThenDispatch(url, 'FETCH_RESTAURANT', dispatch)
  }
})

const RestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant)

export default RestaurantContainer
