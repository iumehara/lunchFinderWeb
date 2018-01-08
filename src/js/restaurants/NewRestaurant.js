import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'

export default class NewRestaurant extends React.Component {
  render() {
    return (
      <div>
        <h1 className='title'>New Restaurant</h1>
        <RestaurantFormContainer saveButtonWasClicked={this.props.createNewRestaurant}/>
      </div>
    )
  }
}
