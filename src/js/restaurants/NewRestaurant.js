// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import type {BasicRestaurantType} from './RestaurantTypes'
import RestaurantCard from './RestaurantCard'

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
    const restaurants = this.props.restaurants.map((restaurant, i) => {
      return <RestaurantCard key={i} restaurant={restaurant}/>
    })

    return (
      <div className='restaurant'>
        <div className='main'>
          <div className='restaurant-list'>
            <div className='title'>
              <h1>Existing Restaurants</h1>
            </div>
            <div>{restaurants}</div>
          </div>
          <div className='details'>
            <h1 className='title'>New Restaurant</h1>
            <RestaurantFormContainer saveButtonWasClicked={this.props.createNewRestaurant}/>
          </div>
        </div>
      </div>
    )
  }
}
