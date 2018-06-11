// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import type {RestaurantType} from './RestaurantTypes'
import {basicRestaurantBuilder} from './RestaurantTypes'
import RestaurantCardLink from "./RestaurantCardLink";
import type {CategoryType} from '../categories/CategoryTypes'
import {Link} from 'react-router-dom'

type Props = {
  category: CategoryType,
  restaurant?: RestaurantType
}

class RestaurantList extends React.Component<Props> {
  render() {
    const category = this.props.category
    let categoryLink
    let categoryRestaurants
    let editCategoryLink

    if (category.restaurants.length > 0) {
      categoryRestaurants = category.restaurants.map((restaurant, i) => {
        const selected = (this.props.restaurant != null && restaurant.id === this.props.restaurant.id)
        return <RestaurantCardLink key={i} restaurant={restaurant} selected={selected}/>
      })
      categoryLink = <CategoryLink category={category}/>
      editCategoryLink = <Link to={`/categories/${category.id}/edit`}>Edit Category</Link>
    } else if (this.props.restaurant) {
      const basicRestaurant = basicRestaurantBuilder(this.props.restaurant)
      categoryRestaurants = <RestaurantCardLink restaurant={basicRestaurant} selected={true}/>
    }

    return (
      <div className='restaurant-list'>
        <div className='title'>
          {categoryLink}
          <h1>Restaurants</h1>
        </div>
        <div>
          {categoryRestaurants}
        </div>
        <br/>
        {editCategoryLink}
      </div>
    )
  }
}

export default RestaurantList
