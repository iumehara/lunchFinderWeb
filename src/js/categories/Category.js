import React from 'react'
import RestaurantCard from '../restaurants/RestaurantCard'

class Category extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps.match.params.id)
    }
  }

  componentWillMount() {
    this.fetchData(this.props.match.params.id)
  }

  fetchData(id) {
    this.props.fetchCategory(id)
    this.props.fetchRestaurants()
  }

  render() {
    const category = this.props.category
    const categories = category.restaurants.map((restaurant, i) => <RestaurantCard key={i} restaurant={restaurant}/>)

    const restaurantOptions = this.props.restaurants
      .filter(restaurant => !category.restaurants.map(r => r.id ).includes(restaurant.id))
      .map((restaurant, i) => <option key={i + 1} value={restaurant.id}>{restaurant.name}</option>)

    restaurantOptions.unshift(<option key={0} value={0}>select category</option>)

    return (
      <div>
        <h1 className='title'>{category.name}</h1>
        {categories}
        <select className='restaurants' name="text" value={this.props.restaurant.id} onChange={this.props.setRestaurantId}>
          {restaurantOptions}
        </select>
        <button className='add-category' onClick={this.props.addCategory}>Add</button>
      </div>
    )
  }
}

export default Category
