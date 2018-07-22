import {connect} from 'react-redux'
import NewRestaurant from './NewRestaurant'
import {createRestaurant} from '../fetchers/resourceFetcher'
import {fetchRestaurantsThenDispatch} from '../actions'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => ({
  restaurants: state.restaurants,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRestaurants: () => fetchRestaurantsThenDispatch(dispatch),

  resetNewRestaurant: () => dispatch({type: 'RESET_NEW_RESTAURANT'}),

  toggleNewRestaurantMode: () => dispatch({type: 'TOGGLE_NEW_RESTAURANT_MODE'}),

  createNewRestaurant: (restaurant) => {
    createRestaurant(restaurant)
      .then(idObject => {
        dispatch({type: 'TOGGLE_NEW_RESTAURANT_MODE'})
        ownProps.history.push(`/restaurants/${idObject.id}`)
      })
  }
})

const NewRestaurantContainer = withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NewRestaurant)
)

export default NewRestaurantContainer
