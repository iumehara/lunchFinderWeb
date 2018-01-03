import React from 'react'
import { Link } from 'react-router-dom'

class Category extends React.Component {
  componentWillMount() {
    this.props.fetchCategory()
  }

  render() {
    const category = this.props.category
    return (
      <div>
        <h1 className='title'>{category.name}</h1>
        <ul>
          {
            category.restaurants.map((restaurant, i) => {
              return (
                <li key={i}>
                  <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Category
