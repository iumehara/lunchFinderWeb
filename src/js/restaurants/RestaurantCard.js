// @flow
import React from 'react'
import type {BasicRestaurantType} from "./RestaurantTypes";

type Props = {
  restaurant: BasicRestaurantType,
  remove?: () => {}
}

const RestaurantCard = (props: Props) => {
  const categoryCount = props.restaurant.categoryIds ? props.restaurant.categoryIds.length : props.restaurant.categories.length

  const removeButton = () => {
    if (props.remove) {
      return <button className='danger' onClick={props.remove}>Remove Restaurant</button>
    }
  }

  return (
    <div className='restaurant-card'>
      <div className='card-details'>
        <div className='title'>{props.restaurant.name} ({props.restaurant.nameJp})</div>
        <div className='categories'>
          <div>{categoryCount} categories</div>
        </div>
        {removeButton()}
      </div>
    </div>
  )
}

export default RestaurantCard
