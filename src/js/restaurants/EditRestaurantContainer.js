import { connect } from 'react-redux'
import EditRestaurant from './EditRestaurant'
import { fetchNewRestaurantThenDispatch } from '../actions'
import { updateRestaurant, destroyRestaurant } from '../fetchers/resourceFetcher'

export const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  newRestaurant: state.newRestaurant,
  updateNewRestaurant: () => {
    updateRestaurant(ownProps.match.params.id, state.newRestaurant)
      .then(() => ownProps.history.push(`/restaurants/${ownProps.match.params.id}`))
  },
  destroyRestaurant: () => {
    destroyRestaurant(ownProps.match.params.id)
      .then(() => ownProps.history.push('/'))
  }
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRestaurant: () => {
    fetchNewRestaurantThenDispatch(ownProps.match.params.id, dispatch)
  }
})

const EditRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRestaurant)

export default EditRestaurantContainer
