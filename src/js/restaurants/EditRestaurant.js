// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import { Link } from 'react-router-dom'
import { confirm } from '../wrappers/windowWrapper'
import type { NewRestaurantType } from './RestaurantTypes'

type Props = {
  id: string,
  newRestaurant: NewRestaurantType,
  fetchRestaurant: () => {},
  updateNewRestaurant: () => {},
  destroyRestaurant: () => {}
}

export default class EditRestaurant extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchRestaurant()
  }

  destroyIfConfirmed() {
    if (confirm(`delete restaurant ${this.props.newRestaurant.name}?`)) {
      this.props.destroyRestaurant()
    }
  }

  render() {
    return (
      <div>
        <div>edit restaurant</div>
        <RestaurantFormContainer saveButtonWasClicked={this.props.updateNewRestaurant} editMode={true}/>
        <button className='delete' onClick={this.destroyIfConfirmed.bind(this)}>Delete</button>
        <Link to={`/restaurants/${this.props.id}`}>Cancel</Link>
      </div>
    )
  }
}
