// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import type {RestaurantType} from './RestaurantTypes'
import RestaurantCardLink from "./RestaurantCardLink";
import type {CategoryType} from '../categories/CategoryTypes'
import {Link} from 'react-router-dom'

type Props = {
  category?: CategoryType,
  restaurant?: RestaurantType,
  restaurants: Array<RestaurantType>
}

class RestaurantList extends React.Component<Props> {
  render() {
    const category = this.props.category
    let categoryLink
    let editCategoryLink
    if (category && category.id) {
      editCategoryLink = <Link to={`/categories/${category.id}/edit`}>Edit Category</Link>
      categoryLink = <CategoryLink category={category}/>
    }

    let restaurantList
    if (this.props.restaurants.length > 0) {
      restaurantList = this.props.restaurants.map((restaurant, i) => {
        const selected = (this.props.restaurant != null && restaurant.id === this.props.restaurant.id)
        return <RestaurantCardLink key={i} restaurant={restaurant} selected={selected}/>
      })
    } else if (this.props.restaurant) {
      restaurantList = <RestaurantCardLink restaurant={this.props.restaurant} selected={true}/>
    }

    return (
      <div className='restaurant-list'>
        <div className='title'>
          {categoryLink}<h1>Restaurants</h1>
        </div>
        <div>
          {restaurantList}
        </div>
        <br/>
        {editCategoryLink}
      </div>
    )
  }
}

export default RestaurantList
