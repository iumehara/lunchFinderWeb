import React from 'react'
import RestaurantList from './RestaurantList'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'

export default class Restaurants extends React.Component {
  componentDidMount() {
    this.props.fetchRestaurants()
  }

  render() {
    return (
      <div className='restaurant'>
        <div className='main'>
          <RestaurantList restaurants={this.props.restaurants}/>
          <div className='details'>
            <div className='title'>
              <h1>All Restaurants</h1>
            </div>
            <MultipleMarkerMap restaurants={this.props.restaurants}/>
          </div>
        </div>
      </div>
    )
  }}