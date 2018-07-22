// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import type {RestaurantType} from './RestaurantTypes'

type Props = {
  fetchRestaurants: () => {},
  resetNewRestaurant: () => {},
  restaurants: Array<RestaurantType>,
  createNewRestaurant: () => {},
  toggleNewRestaurantMode: () => {}
}

export default class NewRestaurant extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRestaurants()
    this.props.resetNewRestaurant()
  }

  render() {
    return (
      <div className='modal restaurant'>
        <div className='title-bar'>
          <div className='title'>New Restaurant</div>
          <div className='close' onClick={this.props.toggleNewRestaurantMode}>☓</div>
        </div>
        <RestaurantFormContainer saveButtonWasClicked={this.props.createNewRestaurant}/>
      </div>
    )
  }
}
