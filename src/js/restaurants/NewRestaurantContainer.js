import { connect } from 'react-redux'
import NewRestaurant from './NewRestaurant'
import { createRestaurant } from '../fetchers/resourceFetcher'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  createNewRestaurant: () => {
    createRestaurant(state.newRestaurant)
      .then(idObject => ownProps.history.push(`/restaurants/${idObject.id}`))
  }
})

const NewRestaurantContainer = connect(
  mapStateToProps
)(NewRestaurant)

export default NewRestaurantContainer
