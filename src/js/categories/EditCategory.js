// @flow
import React from 'react'
import type {CategoryType} from './CategoryTypes'
import type {RestaurantType} from '../restaurants/RestaurantTypes'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'
import {Link} from 'react-router-dom'
import RestaurantCard from '../restaurants/RestaurantCard'

type Props = {
  match: {params: {id: string}},
  category: CategoryType,
  restaurant: RestaurantType,
  restaurants: Array<RestaurantType>,
  fetchCategory: (id: string) => {},
  fetchRestaurants: () => {},
  setRestaurantId: () => {},
  addCategory: (restaurantId: string, categoryId: string) => {},
  removeCategory: (restaurantId: string, categoryId: string) => {},
  destroyCategory: () => {}
}

class EditCategory extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps.match.params.id)
    }
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id)
  }

  fetchData(id: string) {
    this.props.fetchCategory(id)
    this.props.fetchRestaurants()
  }

  addCategory() {
    this.props.addCategory(this.props.restaurant.id, this.props.category.id)
  }

  renderDeleteCategoryButton() {
    if (this.props.category.restaurants.length === 0) {
      return <button className='danger delete' onClick={this.props.destroyCategory}>delete</button>
    }
  }

  render() {
    const category = this.props.category
    const categoryRestaurants = category.restaurants.map((restaurant, i) => {
      const removeCategory = () => {
        return this.props.removeCategory(restaurant.id, this.props.category.id)
      }

      return <RestaurantCard key={i} restaurant={restaurant} remove={removeCategory.bind(this)}/>
    })

    const restaurantOptions = this.props.restaurants
      .filter(restaurant => !category.restaurants.map(r => r.id ).includes(restaurant.id))
      .map((restaurant, i) => <option key={i + 1} value={restaurant.id}>{restaurant.name}</option>)
    restaurantOptions.unshift(<option key={0} value={0}>Select Restaurant</option>)

    return (
      <div className='category'>
        <div className='main'>
          <div className='restaurant-list'>
            <div>
              {categoryRestaurants}
            </div>
            <select className='restaurants' name="text" value={this.props.restaurant.id} onChange={this.props.setRestaurantId}>
              {restaurantOptions}
            </select>
            <button className='add-category action' onClick={this.addCategory.bind(this)}>Add</button>
            <br/>
            {this.renderDeleteCategoryButton()}
            <br/>
            <Link to={`/categories/${this.props.match.params.id}/`}>Back</Link>
          </div>
          <div className='details'>
            <div className='title'>
              <h1>All {category.name} Restaurants</h1>
            </div>
            <MultipleMarkerMap id={this.props.category.id} restaurants={this.props.category.restaurants}/>
          </div>
        </div>
      </div>
    )
  }
}

export default EditCategory
