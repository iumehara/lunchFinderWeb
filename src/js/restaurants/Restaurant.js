// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'
import type {RestaurantType} from './RestaurantTypes'
import type {CategoryType} from '../categories/CategoryTypes'
import RestaurantList from './RestaurantList'
import {displayUrl} from '../helpers'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'

type Props = {
  id: string,
  category: CategoryType,
  restaurant: RestaurantType,
  restaurants: Array<RestaurantType>,
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
    const restaurant = this.props.restaurant
    const category = this.props.category
    const categoryLinks = restaurant.categories.map((category, i) => {
      const active = category.id === this.props.category.id
      return <CategoryLink key={i} category={category} active={active}/>
    })

    const restaurants = category.restaurants.length > 0 ? category.restaurants : [restaurant]


    return (
      <div className='main'>
        <RestaurantList
          category={category}
          restaurant={restaurant}
          restaurants={this.props.restaurants}
        />
        <div className='details'>
          <MultipleMarkerMap id={restaurant.id} restaurant={restaurant} restaurants={restaurants}/>
          <div className='title'>
            <h1>{restaurant.nameJp}</h1>
            <div>{restaurant.name}</div>
            <a className='website' href={displayUrl(restaurant.website)} target='_blank'>{restaurant.website}</a>
          </div>
          <ul>
            {categoryLinks}
          </ul>
          <Link className='edit-restaurant' to={`/restaurants/${restaurant.id}/edit`}>Edit Restaurant</Link>
        </div>
      </div>
    )
  }
}

export default Restaurant
