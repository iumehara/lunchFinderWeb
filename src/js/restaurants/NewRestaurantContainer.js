import {connect} from 'react-redux'
import NewRestaurant from './NewRestaurant'
import {createRestaurant} from '../fetchers/resourceFetcher'
import {fetchRestaurantsThenDispatch} from '../actions'

const mapStateToProps = (state, ownProps) => ({
  restaurants: state.restaurants,
  createNewRestaurant: () => {
    createRestaurant(state.newRestaurant)
      .then(idObject => ownProps.history.push(`/restaurants/${idObject.id}`))
  }
})

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: () => fetchRestaurantsThenDispatch(dispatch)
})

const NewRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRestaurant)

export default NewRestaurantContainer
