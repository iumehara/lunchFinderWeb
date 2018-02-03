// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'
import Map from '../maps/Map'
import type {RestaurantType} from './RestaurantTypes'

type Props = {
  restaurant: RestaurantType,
  fetchRestaurant: () => {}
}

class Restaurant extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRestaurant()
  }

  render() {
    const restaurant = this.props.restaurant
    const categories = restaurant.categories.map((category, i) => <CategoryLink key={i} category={category}/>)

    return (
      <div>
        <div className='title'>
          <h1>{restaurant.nameJp}</h1>({restaurant.name})
        </div>
        <Map restaurant={restaurant}/>
        <ul>
          {categories}
        </ul>
        <Link to={`/restaurants/${restaurant.id}/edit`}>Edit</Link>
      </div>
    )
  }
}

export default Restaurant
