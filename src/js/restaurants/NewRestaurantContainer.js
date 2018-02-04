import { connect } from 'react-redux'
import NewRestaurant from './NewRestaurant'
import { createRestaurant } from '../fetchers/resourceFetcher'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  createNewRestaurant: () => {
    createRestaurant(state.newRestaurant)
      .then(id => ownProps.history.push(`/restaurants/${id}`))
  }
})

const NewRestaurantContainer = connect(
  mapStateToProps
)(NewRestaurant)

export default NewRestaurantContainer
