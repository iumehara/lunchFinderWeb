import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import { Link } from 'react-router-dom'

export default class RestaurantCard extends React.Component {
  render() {
    const restaurant = this.props.restaurant

    return (
      <div className='restaurant-card'>
        <Link to={`/restaurants/${restaurant.id}`}>
          <div className='title'>{restaurant.name} ({restaurant.nameJp})</div>
        </Link>
        <div className='categories'>
          {restaurant.categories.map((category, i) => <CategoryLink key={i} category={category}/>)}
        </div>
      </div>
    )
  }
}
