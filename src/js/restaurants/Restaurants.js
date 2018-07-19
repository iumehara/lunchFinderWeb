import React from 'react'
import RestaurantList from './RestaurantList'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'

export default class Restaurants extends React.Component {
  componentDidMount() {
    this.props.fetchRestaurants()
    this.props.clearCategory()
  }

  render() {
    return (
      <div className='main'>
        <RestaurantList restaurants={this.props.restaurants}/>
        <div className='details'>
          <MultipleMarkerMap restaurants={this.props.restaurants}/>
        </div>
      </div>
    )
  }
}