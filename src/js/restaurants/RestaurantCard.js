// @flow
import React from 'react'
import {Link} from 'react-router-dom'
import type {BasicRestaurantType} from "./RestaurantTypes";

type Props = {
  restaurant: BasicRestaurantType,
  selected: boolean
}

const RestaurantCard = (props: Props) => {
  const categoryCount = props.restaurant.categoryIds ? props.restaurant.categoryIds.length : props.restaurant.categories.length
  const selected = props.selected ? 'selected' : ''
  return (
    <Link to={`/restaurants/${props.restaurant.id}`} className='restaurant-card'>
      <div className={`card-details ${selected}`}>
        <div className='title'>{props.restaurant.name} ({props.restaurant.nameJp})</div>
        <div className='categories'>
          <div>{categoryCount} categories</div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard
