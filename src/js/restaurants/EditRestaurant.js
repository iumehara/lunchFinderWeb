import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'

export default class EditRestaurant extends React.Component {
  componentWillMount() {
    this.props.fetchRestaurant()
  }

  render() {
    return (
      <div>
        <div>edit restaurant</div>
        <RestaurantFormContainer saveButtonWasClicked={this.props.updateNewRestaurant}/>
      </div>
    )
  }
}
