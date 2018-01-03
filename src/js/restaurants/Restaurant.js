import React from 'react'
import { Link } from 'react-router-dom'

class Restaurant extends React.Component {
  componentWillMount() {
    this.props.fetchRestaurant()
  }

  render() {
    const restaurant = this.props.restaurant
    return (
      <div>
        <h1 className='title'>{restaurant.name}</h1>
        <ul>
          {
            restaurant.categories.map((category, i) => {
              return (
                <li key={i}>
                  <Link to={`/categories/${category.id}`}>{category.name}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Restaurant
