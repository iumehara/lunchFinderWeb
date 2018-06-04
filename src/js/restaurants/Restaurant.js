// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'
import SingleMarkerMap from '../maps/SingleMarkerMap'
import type {RestaurantType} from './RestaurantTypes'
import {basicRestaurantBuilder} from './RestaurantTypes'
import RestaurantCardLink from "./RestaurantCardLink";
import type {CategoryType} from '../categories/CategoryTypes'

type Props = {
  id: string,
  category: CategoryType,
  restaurant: RestaurantType,
  fetchRestaurant: () => {}
}

class Restaurant extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.id !== nextProps.id) {
      nextProps.fetchRestaurant()
    }
  }

  componentDidMount() {
    this.props.fetchRestaurant()
  }

  render() {
    let categoryLink
    const category = this.props.category
    let categoryRestaurants

    if (category.restaurants.length > 0) {
      categoryRestaurants = category.restaurants.map((restaurant, i) => {
        const selected = restaurant.id === this.props.restaurant.id
        return <RestaurantCardLink key={i} restaurant={restaurant} selected={selected}/>
      })
      categoryLink = <CategoryLink category={category}/>
    } else {
      const basicRestaurant = basicRestaurantBuilder(this.props.restaurant)
      categoryRestaurants = <RestaurantCardLink restaurant={basicRestaurant} selected={true}/>
    }

    const restaurant = this.props.restaurant
    const categories = restaurant.categories.map((category, i) => {
      return <CategoryLink key={i} category={category}/>
    })

    return (
      <div className='restaurant'>
        <div className='main'>
          <div className='restaurant-list'>
            <div className='title'>
              {categoryLink}
              <h1>Restaurants</h1>
            </div>
            <div>
              {categoryRestaurants}
            </div>
          </div>
          <div className='details'>
            <div className='title'>
              <h1>{restaurant.nameJp}</h1>
              <div>{restaurant.name}</div>
              <div>{restaurant.website}</div>
            </div>
            <SingleMarkerMap restaurant={restaurant}/>
            <ul>
              {categories}
            </ul>
            <Link to={`/restaurants/${restaurant.id}/edit`}>Edit</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant
