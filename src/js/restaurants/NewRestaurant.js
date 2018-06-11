// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import type {BasicRestaurantType} from './RestaurantTypes'
import RestaurantList from './RestaurantList'

type Props = {
  fetchRestaurants: () => {},
  resetNewRestaurant: () => {},
  restaurants: [BasicRestaurantType],
  createNewRestaurant: () => {}
}

export default class NewRestaurant extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRestaurants()
    this.props.resetNewRestaurant()
  }

  render() {
    return (
      <div className='restaurant'>
        <div className='main'>
          <RestaurantList restaurants={this.props.restaurants}/>
          <div className='details'>
            <h1 className='title'>New Restaurant</h1>
            <RestaurantFormContainer saveButtonWasClicked={this.props.createNewRestaurant}/>
          </div>
        </div>
      </div>
    )
  }
}
