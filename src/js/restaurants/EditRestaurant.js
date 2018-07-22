// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import {Link} from 'react-router-dom'
import {confirm} from '../wrappers/windowWrapper'
import type {NewRestaurantType} from './RestaurantTypes'

type Props = {
  id: string,
  newRestaurant: NewRestaurantType,
  fetchRestaurant: () => {},
  updateNewRestaurant: () => {},
  destroyRestaurant: () => {}
}

export default class EditRestaurant extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRestaurant()
  }

  destroyIfConfirmed() {
    if (confirm(`delete restaurant ${this.props.newRestaurant.name}?`)) {
      this.props.destroyRestaurant()
    }
  }

  render() {
    return (
      <div className='modal restaurant'>
        <div className='title-bar'>
          <h1 className='title'>Edit Restaurant</h1>
          <Link className='close' to={`/restaurants/${this.props.id}`}>☓</Link>
        </div>
        <div>
          <RestaurantFormContainer saveButtonWasClicked={this.props.updateNewRestaurant} editMode={true}/>
          <button className='danger delete' onClick={this.destroyIfConfirmed.bind(this)}>Delete</button>
        </div>
      </div>
    )
  }
}
