// @flow
import React from 'react'
import {Link} from 'react-router-dom'
import type {BasicRestaurantType} from "./RestaurantTypes";

type Props = {
  restaurant: BasicRestaurantType
}

const RestaurantCard = (props: Props) => (
  <div className='restaurant-card'>
    <Link to={`/restaurants/${props.restaurant.id}`}>
      <div className='title'>{props.restaurant.name} ({props.restaurant.nameJp})</div>
    </Link>
    <div className='categories'>
        <div>{props.restaurant.categoryIds.length} categories</div>
    </div>
  </div>
)

export default RestaurantCard
