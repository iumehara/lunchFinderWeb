// @flow
import React from 'react'
import RestaurantCard from '../restaurants/RestaurantCard'
import type { CategoryType } from './CategoryTypes'
import type { RestaurantType } from '../restaurants/RestaurantTypes'

type Props = {
  match: {params: {id: string}},
  category: CategoryType,
  restaurant: RestaurantType,
  restaurants: [RestaurantType],
  fetchCategory: (id: string) => {},
  fetchRestaurants: () => {},
  setRestaurantId: () => {},
  addCategory: (restaurantId: string, categoryId: string) => {}
}

class Category extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps.match.params.id)
    }
  }

  componentWillMount() {
    this.fetchData(this.props.match.params.id)
  }

  fetchData(id: string) {
    this.props.fetchCategory(id)
    this.props.fetchRestaurants()
  }

  addCategory() {
    this.props.addCategory(this.props.restaurant.id, this.props.category.id)
  }

  render() {
    const category = this.props.category
    const categories = category.restaurants.map((restaurant, i) => <RestaurantCard key={i} restaurant={restaurant}/>)

    const restaurantOptions = this.props.restaurants
      .filter(restaurant => !category.restaurants.map(r => r.id ).includes(restaurant.id))
      .map((restaurant, i) => <option key={i + 1} value={restaurant.id}>{restaurant.name}</option>)
    restaurantOptions.unshift(<option key={0} value={0}>Select Restaurant</option>)

    return (
      <div>
        <h1 className='title'>{category.name}</h1>
        {categories}
        <select className='restaurants' name="text" value={this.props.restaurant.id} onChange={this.props.setRestaurantId}>
          {restaurantOptions}
        </select>
        <button className='add-category' onClick={this.addCategory.bind(this)}>Add</button>
      </div>
    )
  }
}

export default Category
