import { connect } from 'react-redux'
import NewRestaurant from './NewRestaurant'
import { httpPost } from '../fetchers/httpFetcher'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  createNewRestaurant: () => {
    const url = 'http://localhost:8080/restaurants/'
    httpPost(url, state.newRestaurant)
      .then(id => ownProps.history.push(`/restaurants/${id}`))
  }
})

const NewRestaurantContainer = connect(
  mapStateToProps
)(NewRestaurant)

export default NewRestaurantContainer
