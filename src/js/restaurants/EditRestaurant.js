import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import {Link} from 'react-router-dom'

export default class EditRestaurant extends React.Component {
  componentWillMount() {
    this.props.fetchRestaurant()
  }

  render() {
    return (
      <div>
        <div>edit restaurant</div>
        <RestaurantFormContainer saveButtonWasClicked={this.props.updateNewRestaurant}/>
        <Link to={`/restaurants/${this.props.newRestaurant.id}`}>Cancel</Link>
      </div>
    )
  }
}
