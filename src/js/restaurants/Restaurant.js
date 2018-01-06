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
        <div className='title'>
          <h1>{restaurant.nameJp}</h1>({restaurant.name})
        </div>
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
