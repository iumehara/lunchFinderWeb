import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import { Link } from 'react-router-dom'

const RestaurantCard = props => (
  <div className='restaurant-card'>
    <Link to={`/restaurants/${props.restaurant.id}`}>
      <div className='title'>{props.restaurant.name} ({props.restaurant.nameJp})</div>
    </Link>
    <div className='categories'>
      {props.restaurant.categories.map((category, i) => <CategoryLink key={i} category={category}/>)}
    </div>
  </div>
)

export default RestaurantCard