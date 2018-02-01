import { connect } from 'react-redux'
import EditRestaurant from './EditRestaurant'
import { fetchNewRestaurantThenDispatch } from '../actions'
import { httpPut, httpDelete } from '../fetchers/httpFetcher'

export const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  newRestaurant: state.newRestaurant,
  updateNewRestaurant: () => {
    const url = `http://localhost:8080/restaurants/${ownProps.match.params.id}`
    httpPut(url, state.newRestaurant)
      .then(() => ownProps.history.push(`/restaurants/${ownProps.match.params.id}`))
  },
  destroyRestaurant: () => {
    const url = `http://localhost:8080/restaurants/${ownProps.match.params.id}`
    httpDelete(url)
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
