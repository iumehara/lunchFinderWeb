// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import type {RestaurantType} from './RestaurantTypes'
import RestaurantCardLink from './RestaurantCardLink'

type Props = {
  fetchRestaurants: () => {},
  restaurants: [RestaurantType],
  createNewRestaurant: () => {}
}

export default class NewRestaurant extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRestaurants()
  }

  render() {
    const restaurants = this.props.restaurants.map((restaurant, i) => {
      return <RestaurantCardLink key={i} restaurant={restaurant} selected={false}/>
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
