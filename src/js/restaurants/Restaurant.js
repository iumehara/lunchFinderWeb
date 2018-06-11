// @flow
import React from 'react'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'
import SingleMarkerMap from '../maps/SingleMarkerMap'
import type {RestaurantType} from './RestaurantTypes'
import type {CategoryType} from '../categories/CategoryTypes'
import RestaurantList from './RestaurantList'

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
    const restaurant = this.props.restaurant
    const categories = restaurant.categories.map((category, i) => {
      return <CategoryLink key={i} category={category}/>
    })

    return (
      <div className='restaurant'>
        <div className='main'>
          <RestaurantList category={this.props.category} restaurant={this.props.restaurant}/>
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
            <Link to={`/restaurants/${restaurant.id}/edit`}>Edit Restaurant</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant
