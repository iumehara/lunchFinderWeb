// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'
import SingleMarkerMap from '../maps/SingleMarkerMap'
import type {RestaurantType} from './RestaurantTypes'
import type {CategoryType} from '../categories/CategoryTypes'
import RestaurantList from './RestaurantList'
import {displayUrl} from '../helpers'

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

    return (
      <div className='restaurant'>
        <div className='main'>
          <RestaurantList
            category={category}
            restaurant={restaurant}
            restaurants={this.props.restaurants}
          />
          <div className='details'>
            <div className='title'>
              <h1>{restaurant.nameJp}</h1>
              <div>{restaurant.name}</div>
              <a className='website' href={displayUrl(restaurant.website)} target='_blank'>{restaurant.website}</a>
            </div>
            <SingleMarkerMap restaurant={restaurant}/>
            <ul>
              {categoryLinks}
            </ul>
            <Link className='edit-restaurant' to={`/restaurants/${restaurant.id}/edit`}>Edit Restaurant</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant
