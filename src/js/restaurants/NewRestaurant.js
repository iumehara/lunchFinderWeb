// @flow
import React from 'react'
import RestaurantFormContainer from './RestaurantFormContainer'
import type { NewRestaurantType } from './RestaurantTypes'

type Props = {
  createNewRestaurant: () => {}
}

export default class NewRestaurant extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1 className='title'>New Restaurant</h1>
        <RestaurantFormContainer saveButtonWasClicked={this.props.createNewRestaurant}/>
      </div>
    )
  }
}
