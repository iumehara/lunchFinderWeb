// @flow
import React from 'react'
import {Link} from 'react-router-dom'
import type {RestaurantType} from './RestaurantTypes'

type Props = {
  restaurant: RestaurantType,
  selected: boolean
}

const RestaurantCardLink = (props: Props) => {
  const selected = props.selected ? 'selected' : ''
  return (
    <Link to={`/restaurants/${props.restaurant.id}`} className='restaurant-card'>
      <div className={`card-details ${selected}`}>
        <div className='title'>{props.restaurant.name} ({props.restaurant.nameJp})</div>
        <div className='categories'>
          <div>{props.restaurant.categories.map(category => category.name).join(' | ')}</div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCardLink
