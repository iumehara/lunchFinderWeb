import { connect } from 'react-redux'
import NewRestaurant from './NewRestaurant'
import {
  fetchThenDispatch,
  setDispatch
} from '../actions'
import { httpPost } from '../httpGet'

export const mapStateToProps = (state, ownProps) => ({
  newRestaurant: state.newRestaurant,
  createNewRestaurant: () => {
    const url = 'http://localhost:8080/restaurants/'
    httpPost(url, state.newRestaurant)
      .then(id => {
        ownProps.history.push(`/restaurants/${id}`)
      })
  }
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onNameChange: (event) => {
    const newRestaurant = {name: event.target.value}
    setDispatch(newRestaurant, 'SET_NEW_RESTAURANT', dispatch)
  }
})

const NewRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRestaurant)

export default NewRestaurantContainer
