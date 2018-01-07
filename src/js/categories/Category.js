import React from 'react'
import { Link } from 'react-router-dom'
import RestaurantCard from '../restaurants/RestaurantCard'

class Category extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      nextProps.fetchCategory()
    }
  }

  componentWillMount() {
    this.props.fetchCategory()
  }

  render() {
    const category = this.props.category

    return (
      <div>
        <h1 className='title'>{category.name}</h1>
        {
          category.restaurants.map((restaurant, i) => {
            return <RestaurantCard key={i} restaurant={restaurant}/>
          })
        }
      </div>
    )
  }
}

export default Category
